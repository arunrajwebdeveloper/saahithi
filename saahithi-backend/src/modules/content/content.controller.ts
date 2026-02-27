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
import { GetUser } from '@/decorators/get-user.decorator';
import { ContentDocument } from './schemas/content.schema';
import { PremiumGuard } from '@/guards/premium.guard';
import { PremiumOnly } from '@/decorators/premium.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { UserRole } from '../auth/dto/register-user.dto';

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

  @Get('list')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) //   @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id/draft')
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async saveDraft(@Param('id') id: string, @Body() dto: any) {
    return this.contentService.saveDraft(id, dto);
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
