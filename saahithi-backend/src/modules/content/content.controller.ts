import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { ContentDocument } from './schemas/content.schema';
import { PremiumOnly } from '@/common/decorators/premium.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '../auth/dto/register-user.dto';
import { PremiumGuard } from '@/common/guards/premium.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  // @UseGuards(PremiumGuard)
  // @PremiumOnly()
  create(
    @GetUser('userId') userId: string,
    @Body() createContentDto: CreateContentDto,
  ): Promise<ContentDocument | null> {
    return this.contentService.create(createContentDto, userId);
  }

  @Patch(':id')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContentDto,
  ): Promise<ContentDocument | null> {
    return this.contentService.update(id, updateDto);
  }

  @Get(':author/list')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN) //   @Roles(UserRole.ADMIN, UserRole.USER)
  findUserContent(@Param('author') author: string) {
    return this.contentService.findUserContent(author);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id/draft')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async saveAsDraft(@Param('id') id: string) {
    return this.contentService.saveAsDraft(id);
  }

  @Patch(':id/publish')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async publishContent(@Param('id') id: string) {
    return this.contentService.publishContent(id);
  }

  @Patch(':id/trash')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async softDelete(@Param('id') id: string) {
    return this.contentService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async restore(@Param('id') id: string) {
    return this.contentService.restore(id);
  }

  @Delete(':id/permanent')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async hardDelete(@Param('id') id: string) {
    return this.contentService.permanentDelete(id);
  }
}
