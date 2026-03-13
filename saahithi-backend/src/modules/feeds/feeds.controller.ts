import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/user';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Get('discovery')
  async getDiscovery() {
    return this.feedsService.getDiscoveryFeed();
  }

  @Get('personalized')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getPersonalized(@GetUser('userId') userId: string) {
    return this.feedsService.getPersonalizedFeed(userId);
  }
}
