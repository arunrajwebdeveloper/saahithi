import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEvents, ContentImageIds, UserImageId } from './event.types';

@Injectable()
export class CloudinaryCleanupListener {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @OnEvent(AppEvents.CONTENT_DELETED)
  async handleContentDeleted(payload: ContentImageIds) {
    if (payload.imageIds.length > 0) {
      await this.cloudinaryService.deleteResources(payload.imageIds);

      this.logger.log(
        `Removed ${payload?.imageIds?.length} images from Cloudinary...`,
      );
    }
  }

  @OnEvent(AppEvents.USER_DELETED)
  async handleUserDeleted(payload: UserImageId) {
    if (payload.imageId) {
      await this.cloudinaryService.deleteImage(payload.imageId);
      this.logger.log('Removed image from Cloudinary...');
    }
  }
}
