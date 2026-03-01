import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ContentModule } from '../content/content.module';
import { GatewayModule } from '@/common/gateway/gateway.module';
import { EventsModule } from '@/common/events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => EventsModule),
    GatewayModule,
    UsersModule,
    ContentModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
