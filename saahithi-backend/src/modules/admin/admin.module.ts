import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [UsersModule, ContentModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
