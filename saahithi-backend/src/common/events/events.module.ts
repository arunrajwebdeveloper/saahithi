import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEvents } from './user.events';
import { ContentEvents } from './content.events';
import { AdminListener } from './admin.listener';
import { AdminModule } from '@/modules/admin/admin.module';

@Global() // it will make this module globally available
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true, // allows events like "user.*"
    }),
    AdminModule,
    // forwardRef(() => AdminModule), // use for circular dependency situations
  ],
  providers: [UserEvents, ContentEvents, AdminListener],
  exports: [EventEmitterModule, ContentEvents, UserEvents], // must export those files to use other modules like service files, so it can use straightly use in other services without import module, only need to import service
})
export class EventsModule {}

// First, what forwardRef() actually does

// In NestJS, modules and providers are instantiated in a dependency graph.
// When two modules or services depend on each other, NestJS can’t decide which to create first.
// forwardRef() tells Nest:
// “This dependency will exist later — resolve it lazily.”
// So it’s used to break circular dependencies.

// Common circular dependency situations
// Module ↔ Module circular imports
// Eg:
/*
// admin.module.ts
@Module({
  imports: [EventsModule],
})
export class AdminModule {}

// events.module.ts
@Module({
  imports: [AdminModule],
})
export class EventsModule {}
*/
