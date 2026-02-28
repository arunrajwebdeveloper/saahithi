import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AdminService } from './admin.service';
import { RolesGuard } from '@/guards/roles.guard';
import { UserRole } from '../auth/dto/register-user.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ContentService } from '../content/content.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    // private readonly adminService: AdminService,
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
}
