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

  @ApiOperation({ summary: 'Get current user details' })
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

  @Patch('update')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateCurrentUser(
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(req.user?.userId, updateUserDto);
  }

  @Patch('inactivate')
  @ApiOperation({ summary: 'Inactivate a current user' })
  async inactiveUser(@Req() req: any) {
    return this.userService.inactiveUser(req.user?.userId);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete current user' })
  async permanentDelete(@Req() req: any) {
    return this.userService.permanentDelete(req.user?.userId);
  }
}
