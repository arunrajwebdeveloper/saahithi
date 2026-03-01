import { Global, Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [AppGateway, JwtService],
  exports: [AppGateway],
})
export class GatewayModule {}
