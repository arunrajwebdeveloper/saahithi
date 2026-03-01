import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ContentModule } from '../content/content.module';
import { UsersModule } from '../users/users.module';
import { GatewayModule } from '@/gateway/gateway.module';

@Module({
  imports: [UsersModule, ContentModule, GatewayModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
