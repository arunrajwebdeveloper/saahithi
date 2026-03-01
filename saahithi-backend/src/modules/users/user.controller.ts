import {
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserStatus } from '@/common/constants/user';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('activate/:id')
  async activeUser(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }

  @Patch('inactivate/:id')
  async inactiveUser(@Param('id') id: string) {
    return this.userService.inactiveUser(id);
  }

  @Patch('block/:id')
  async blockUser(@Param('id') id: string) {
    return this.userService.blockUser(id);
  }

  @Delete('delete/:id')
  async permanentDelete(@Param('id') id: string) {
    return this.userService.permanentDelete(id);
  }
}
