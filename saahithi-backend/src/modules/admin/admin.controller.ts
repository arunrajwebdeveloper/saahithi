import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '@/guards/roles.guard';
import { UserRole } from '../auth/dto/register-user.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ContentService } from '../content/content.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
    private readonly contentService: ContentService,
  ) {}

  @Get('user-list')
  getUserList() {
    return this.userService.findAll();
  }

  @Get('content-list')
  getContentList() {
    return this.contentService.findAll();
  }

  @Get('stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('progress')
  getProgressData(
    @Query('range') range: 'day' | 'week' | 'month' | 'year' = 'month',
  ) {
    return this.adminService.getProgressData(range);
  }
}
