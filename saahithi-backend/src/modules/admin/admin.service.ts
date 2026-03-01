import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ContentService } from '../content/content.service';
import { AppGateway } from '@/common/gateway/app.gateway';

@Injectable()
export class AdminService {
  constructor(
    private readonly appGateway: AppGateway,
    private readonly userService: UsersService,
    private readonly contentService: ContentService,
  ) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalPremiumUsers,
      recentUsers,
      totalPosts,
      publishedPosts,
      categories,
      mostActiveAuthors,
      recentPosts,
      userGrowth,
      postGrowth,
      categoryDistribution,
    ] = await Promise.all([
      this.userService.countAll(),
      this.userService.countPremiumUsers(),
      this.userService.getRecentUsers(),
      this.contentService.countAll(),
      this.contentService.countPublished(),
      this.contentService.getAllCategories(),
      this.contentService.getMostActiveAuthors(),
      this.contentService.getRecentPosts(),
      this.userService.calculateGrowth(),
      this.contentService.calculateGrowth(),
      this.contentService.getCategoryDistribution(),
    ]);

    return {
      totalUsers,
      totalPremiumUsers,
      mostActiveAuthors,
      recentUsers,
      totalPosts,
      publishedPosts,
      unpublishedPosts: totalPosts - publishedPosts,
      totalCategories: categories.length,
      categories,
      userGrowth,
      postGrowth,
      recentPosts,
      categoryDistribution,
    };
  }

  async getProgressData(range: 'day' | 'week' | 'month' | 'year') {
    const [userStats, postStats] = await Promise.all([
      this.userService.getProgressData(range),
      this.contentService.getProgressData(range),
    ]);

    return {
      range,
      users: userStats,
      posts: postStats,
    };
  }

  async emitLiveUpdate() {
    const stats = await this.getDashboardStats();
    this.appGateway.emitToNamespace('/admin', 'dashboardUpdate', stats);
  }
}
