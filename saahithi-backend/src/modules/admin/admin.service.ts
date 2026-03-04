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

    const mergedDataMap = new Map<
      string,
      {
        date: string;
        user: number;
        post: number;
      }
    >();

    userStats.forEach((item) => {
      mergedDataMap.set(item._id, {
        date: item._id,
        user: item.count,
        post: 0,
      });
    });

    postStats.forEach((item) => {
      if (mergedDataMap.has(item._id)) {
        mergedDataMap.get(item._id)!.post = item.count;
      } else {
        mergedDataMap.set(item._id, {
          date: item._id,
          user: 0,
          post: item.count,
        });
      }
    });

    return {
      range,
      data: Array.from(mergedDataMap.values()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    };
  }

  async emitLiveUpdate() {
    const stats = await this.getDashboardStats();
    this.appGateway.emitToNamespace('/admin', 'dashboardUpdate', stats);
  }
}
