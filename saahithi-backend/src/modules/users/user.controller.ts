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
  Post,
} from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';

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
  async getMe(@GetUser('userId') userId: string): Promise<UserDocument | null> {
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
    @GetUser('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Patch('inactivate')
  @ApiOperation({ summary: 'Inactivate a current user' })
  async inactiveUser(@GetUser('userId') userId: string) {
    return this.userService.inactiveUser(userId);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete current user' })
  async permanentDelete(@GetUser('userId') userId: string) {
    return this.userService.permanentDelete(userId);
  }

  @Post('follow/:targetId')
  async follow(
    @Param('targetId') targetId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.userService.followUser(userId, targetId);
  }

  @Delete('unfollow/:targetId')
  async unfollow(
    @Param('targetId') targetId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.userService.unfollowUser(userId, targetId);
  }
}
