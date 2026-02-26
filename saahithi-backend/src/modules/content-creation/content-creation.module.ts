import { Module } from '@nestjs/common';
import { ContentCreationService } from './content-creation.service';
import { ContentCreationController } from './content-creation.controller';

@Module({
  controllers: [ContentCreationController],
  providers: [ContentCreationService],
})
export class ContentCreationModule {}
