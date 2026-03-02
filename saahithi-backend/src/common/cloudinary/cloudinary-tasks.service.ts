import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from './cloudinary.service';
import { User } from '@/modules/users/schemas/user.schema';
import { Content } from '@/modules/content/schemas/content.schema';
import { UPLOAD_LOCATION } from '../constants/uploads';

@Injectable()
export class CloudinaryTasksService {
  private readonly logger = new Logger(CloudinaryTasksService.name);

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async cloudinaryCleanup() {
    //  Fetch all existing publicIds from your database
    const users = await this.userModel.find({}, 'avatarPublicId').lean();
    const avatarIds = new Set<string>(
      users.map((u) => u.avatarPublicId).filter((id): id is string => !!id),
    );

    await this.cloudinaryService.cleanupOrphanedImages(
      avatarIds,
      UPLOAD_LOCATION.AVATARS,
    );

    const contents = await this.contentModel.find({}, 'imageRegistry').lean();
    const contentIds = new Set<string>(
      contents.flatMap((c) => c.imageRegistry || []),
    );

    await this.cloudinaryService.cleanupOrphanedImages(
      contentIds,
      UPLOAD_LOCATION.CONTENT_IMAGES,
    );
  }

  /**
   * Automatically cleans up orphaned images every Sunday at midnight.
   */
  @Cron(CronExpression.EVERY_WEEKEND)
  async handleWeeklyCleanup() {
    this.logger.log('Starting automated Cloudinary cleanup...');
    await this.cloudinaryCleanup();
    this.logger.log(`Cleanup complete. Removed orphaned images.`);
  }
}
