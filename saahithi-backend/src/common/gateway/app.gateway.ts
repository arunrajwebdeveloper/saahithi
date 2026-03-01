import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../constants/user';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const cookies = client.handshake.headers.cookie;

      if (!cookies) {
        console.warn('No cookies found in handshake');
        client.disconnect();
        return;
      }

      // Parse cookies
      const parsed = cookie.parse(cookies);
      const token = parsed['access_token'];

      if (!token) {
        console.warn('access_token cookie missing');
        client.disconnect();
        return;
      }

      // Verify JWT
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      (client as any).user = decoded;
      console.log(`${decoded.role} connected via cookie: ${client.id}`);

      // Join role-based rooms (optional)
      if (decoded.role === UserRole.ADMIN) client.join('admins');
      if (decoded.role === UserRole.USER) client.join('users');
    } catch (err) {
      console.error('Invalid token during socket connection:', err);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  // Emit an event to all connected clients
  emit(event: string, data: any) {
    this.server.emit(event, data);
  }

  // Emit an event to a specific namespace
  emitToNamespace(namespace: string, event: string, data: any) {
    this.server.of(namespace).emit(event, data);
  }

  // Emit to a specific room (optional, for user or group updates)
  emitToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  emitToAdmins(event: string, data: any) {
    this.server.to('admins').emit(event, data);
  }

  emitToModerators(event: string, data: any) {
    this.server.to('users').emit(event, data);
  }
}
