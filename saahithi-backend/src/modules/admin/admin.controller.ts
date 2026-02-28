import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AdminService } from './admin.service';
import { RolesGuard } from '@/guards/roles.guard';
import { UserRole } from '../auth/dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    // private readonly adminService: AdminService,
    private readonly userService: UsersService,
  ) {}

  @Get('user-list')
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }
}
