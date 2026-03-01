import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ContentModule } from '../content/content.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, ContentModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
