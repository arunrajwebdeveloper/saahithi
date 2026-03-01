import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppEvents, ContentCreatedPayload } from './event.types';

@Injectable()
export class ContentEvents {
  constructor(private eventEmitter: EventEmitter2) {}

  emitContentCreated(payload: ContentCreatedPayload) {
    this.eventEmitter.emit(AppEvents.CONTENT_CREATED, payload);
  }
}
