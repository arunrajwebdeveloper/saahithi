import {
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/guards/roles.guard';
import { UserRole } from '../auth/dto/register-user.dto';
import { Roles } from '@/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * GET /api/user/me
   * Fetches the profile of the currently authenticated user.
   */

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'Current user get successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Get('me')
  async getMe(@Req() req: any): Promise<UserDocument | null> {
    const userId = req.user?.userId;
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('Authenticated user not found.');
    }

    const { password, ...userObject } = user?.toObject();
    return userObject as UserDocument;
  }

  // ONLY FOR ADMIN
  @Get('list')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) //   @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.userService.findAll();
  }
}

// NEED TO ADD (ADMIN ONLY)
// REMOVE USER
// EDIT USER
