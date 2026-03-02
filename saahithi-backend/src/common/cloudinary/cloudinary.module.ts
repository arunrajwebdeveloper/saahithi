import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryTasksService } from './cloudinary-tasks.service';
import { UsersModule } from '@/modules/users/users.module';
import { ContentModule } from '@/modules/content/content.module';

@Module({
  imports: [UsersModule, ContentModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, CloudinaryTasksService],
  exports: [CloudinaryProvider, CloudinaryService, CloudinaryTasksService],
})
export class CloudinaryModule {}
