import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentCreationService } from './content-creation.service';
import { CreateContentCreationDto } from './dto/create-content-creation.dto';
import { UpdateContentCreationDto } from './dto/update-content-creation.dto';

@Controller('content-creation')
export class ContentCreationController {
  constructor(private readonly contentCreationService: ContentCreationService) {}

  @Post()
  create(@Body() createContentCreationDto: CreateContentCreationDto) {
    return this.contentCreationService.create(createContentCreationDto);
  }

  @Get()
  findAll() {
    return this.contentCreationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentCreationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentCreationDto: UpdateContentCreationDto) {
    return this.contentCreationService.update(+id, updateContentCreationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentCreationService.remove(+id);
  }
}
