import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ContentModule } from '../content/content.module';
import { UsersModule } from '../users/users.module';
import { LogViewerService } from './log-viewer.service';

@Module({
  imports: [UsersModule, ContentModule],
  controllers: [AdminController],
  providers: [AdminService, LogViewerService],
  exports: [AdminService],
})
export class AdminModule {}
