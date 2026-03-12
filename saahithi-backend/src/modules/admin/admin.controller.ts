import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ContentService } from '../content/content.service';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserRole } from '@/common/enums/user';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LogViewerService } from './log-viewer.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { User } from '../users/schemas/user.schema';
import { Content } from '../content/schemas/content.schema';
import { Block } from '../content/schemas/block.schema';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
@ApiTags('Admin')
@ApiCookieAuth('access_token')
@ApiExtraModels(User, Content, Block, PaginationDto)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
    private readonly contentService: ContentService,
    private readonly logViewer: LogViewerService,
  ) {}

  @Get('user-list')
  @ApiOperation({ summary: 'Get all user list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated user list retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 50 },
        limit: { type: 'number', example: 10 },
        page: { type: 'number', example: 1 },
        result: {
          type: 'array',
          items: { $ref: getSchemaPath(User) },
        },
        hasNext: { type: 'boolean', example: true },
        hasPrev: { type: 'boolean', example: false },
      },
    },
  })
  getUserList(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get('content-list')
  @ApiOperation({ summary: 'Get all content list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated content list retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 50 },
        limit: { type: 'number', example: 10 },
        page: { type: 'number', example: 1 },
        result: {
          type: 'array',
          items: { $ref: getSchemaPath(Content) },
        },
        hasNext: { type: 'boolean', example: true },
        hasPrev: { type: 'boolean', example: false },
      },
    },
  })
  getContentList(@Query() paginationDto: PaginationDto) {
    return this.contentService.findAll(paginationDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Statistics for the admin dashboard' })
  getDashboardStats(@Query('range') range: 'day' | 'week' | 'month' | 'year') {
    return this.adminService.getDashboardStats(range);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a profile with ID' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('activate/:id')
  @ApiOperation({ summary: 'Activate a user with ID' })
  async activeUser(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }

  @Patch('inactivate/:id')
  @ApiOperation({ summary: 'Inactivate a user with ID' })
  async inactiveUser(@Param('id') id: string) {
    return this.userService.inactiveUser(id);
  }

  @Patch('terminate/:id')
  @ApiOperation({ summary: 'Terminate a user with ID' })
  async terminateUser(@Param('id') id: string) {
    return this.userService.terminateUser(id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user with ID' })
  async permanentDelete(@Param('id') id: string) {
    return this.userService.permanentDelete(id);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Log list for the admin' })
  @ApiOperation({ summary: 'View the latest application logs' })
  async viewLogs() {
    return await this.logViewer.getLatestLogs();
  }
}
