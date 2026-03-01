import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppEvents, UserCreatedPayload } from './event.types';

@Injectable()
export class UserEvents {
  constructor(private eventEmitter: EventEmitter2) {}

  emitUserCreated(payload: UserCreatedPayload) {
    this.eventEmitter.emit(AppEvents.USER_CREATED, payload);
  }
}
