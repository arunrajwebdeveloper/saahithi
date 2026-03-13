import { Controller, Post, Param, Req, UseGuards, Get } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/user';

@Controller('interactions')
@UseGuards(JwtAuthGuard)
@Roles(UserRole.USER)
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post('view/:id')
  async trackView(
    @Param('id') contentId: string,
    @Req() req: any,
    @GetUser('userId') userId: string,
  ) {
    const ip = req.ip;
    return this.interactionsService.handleView(contentId, userId, ip);
  }

  @Get('my-activity')
  async getMyActivity(@Req() req: any) {
    return this.interactionsService.getUserActivity(req.user.id);
  }
}
