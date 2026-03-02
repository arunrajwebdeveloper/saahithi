import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { ContentDocument } from './schemas/content.schema';
import { PremiumOnly } from '@/common/decorators/premium.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { PremiumGuard } from '@/common/guards/premium.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserRole } from '@/common/constants/user';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create content' })
  // @UseGuards(PremiumGuard)
  // @PremiumOnly()
  create(
    @GetUser('userId') userId: string,
    @Body() createContentDto: CreateContentDto,
  ): Promise<ContentDocument | null> {
    return this.contentService.create(createContentDto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update content' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContentDto,
  ): Promise<ContentDocument | null> {
    return this.contentService.update(id, updateDto);
  }

  @Get(':author/content-list')
  @ApiOperation({ summary: 'Content list based on author' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  findUserContent(
    @Param('author') author: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.contentService.findUserContent(author, paginationDto);
  }

  @Get('content-list')
  @ApiOperation({ summary: "Current user's content list" })
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  findMyContents(@Req() req: any, @Query() paginationDto: PaginationDto) {
    return this.contentService.findUserContent(req.user?.userId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get content details by ID' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id/draft')
  @ApiOperation({ summary: 'Save content as draft' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async saveAsDraft(@Param('id') id: string) {
    return this.contentService.saveAsDraft(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish content' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async publishContent(@Param('id') id: string) {
    return this.contentService.publishContent(id);
  }

  @Patch(':id/trash')
  @ApiOperation({ summary: 'Soft delete content' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async softDelete(@Param('id') id: string) {
    return this.contentService.softDelete(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore content' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async restore(@Param('id') id: string) {
    return this.contentService.restore(id);
  }

  @Delete(':id/permanent')
  @ApiOperation({ summary: 'Permanently delete content' })
  @UseGuards(PremiumGuard)
  @PremiumOnly()
  async hardDelete(@Param('id') id: string) {
    return this.contentService.permanentDelete(id);
  }
}
