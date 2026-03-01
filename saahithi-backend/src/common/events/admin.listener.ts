import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  AppEvents,
  ContentCreatedPayload,
  UserCreatedPayload,
} from './event.types';
import { AppGateway } from '@/common/gateway/app.gateway';
import { AdminService } from '@/modules/admin/admin.service';

@Injectable()
export class AdminListener {
  constructor(
    private readonly gateway: AppGateway,
    private readonly adminService: AdminService,
  ) {}

  @OnEvent(AppEvents.USER_CREATED)
  async handleUserCreated(payload: UserCreatedPayload) {
    console.log('User created event received:', payload.email);
    await this.adminService.emitLiveUpdate();
    this.gateway.emitToAdmins('userCreated', payload);
  }

  @OnEvent(AppEvents.CONTENT_CREATED)
  async handleContentCreated(payload: ContentCreatedPayload) {
    console.log('Content created event received:', payload.title);
    await this.adminService.emitLiveUpdate();
    this.gateway.emitToAdmins('contentCreated', payload);
  }
}
