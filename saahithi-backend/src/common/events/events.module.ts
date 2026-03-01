import { forwardRef, Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GatewayModule } from '@/common/gateway/gateway.module';
import { UserEvents } from './user.events';
import { ContentEvents } from './content.events';
import { AdminListener } from './admin.listener';
import { AdminModule } from '@/modules/admin/admin.module';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true, // allows events like "user.*"
    }),
    GatewayModule,
    forwardRef(() => AdminModule),
  ],
  providers: [UserEvents, ContentEvents, AdminListener],
  exports: [EventEmitterModule, ContentEvents, UserEvents],
})
export class EventsModule {}
