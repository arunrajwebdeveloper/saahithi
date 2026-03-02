import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  AppEvents,
  ContentCreatedPayload,
  UserCreatedPayload,
} from './event.types';
import { AppGateway } from '@/common/gateway/app.gateway';
import { AdminService } from '@/modules/admin/admin.service';
import { CloudinaryTasksService } from '../cloudinary/cloudinary-tasks.service';

@Injectable()
export class AdminListener {
  private readonly logger = new Logger(CloudinaryTasksService.name);

  constructor(
    private readonly gateway: AppGateway,
    private readonly adminService: AdminService,
  ) {}

  @OnEvent(AppEvents.USER_CREATED)
  async handleUserCreated(payload: UserCreatedPayload) {
    this.logger.log('User created event received:', payload.email);
    await this.adminService.emitLiveUpdate();
    this.gateway.emitToAdmins('userCreated', payload);
  }

  @OnEvent(AppEvents.CONTENT_CREATED)
  async handleContentCreated(payload: ContentCreatedPayload) {
    this.logger.log('Content created event received:', payload.title);
    await this.adminService.emitLiveUpdate();
    this.gateway.emitToAdmins('contentCreated', payload);
  }
}
