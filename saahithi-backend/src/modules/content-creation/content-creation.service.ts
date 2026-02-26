import { Injectable } from '@nestjs/common';
import { CreateContentCreationDto } from './dto/create-content-creation.dto';
import { UpdateContentCreationDto } from './dto/update-content-creation.dto';

@Injectable()
export class ContentCreationService {
  create(createContentCreationDto: CreateContentCreationDto) {
    return 'This action adds a new contentCreation';
  }

  findAll() {
    return `This action returns all contentCreation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentCreation`;
  }

  update(id: number, updateContentCreationDto: UpdateContentCreationDto) {
    return `This action updates a #${id} contentCreation`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentCreation`;
  }
}
