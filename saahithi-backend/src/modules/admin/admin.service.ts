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

  private getRangeConfig(range: string) {
    const now = new Date();
    let startDate = new Date();
    let dateFormat = '%Y-%m-%d';

    if (range === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
      dateFormat = '%Y-%m';
    } else if (range === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (range === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setHours(0, 0, 0, 0);
    }
    return { startDate, dateFormat };
  }

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

  async getEngagementTrends(range: 'day' | 'week' | 'month' | 'year') {
    const { startDate, dateFormat } = this.getRangeConfig(range);

    const [userStats, contentStats] = await Promise.all([
      this.userService.getSignupTrends(startDate, dateFormat),
      this.contentService.getContentTrends(startDate, dateFormat),
    ]);

    const trendMap = new Map<string, any>();

    userStats.forEach((u) => {
      trendMap.set(u._id, {
        date: u._id,
        signups: u.totalSignups,
        premiumSignups: u.premiumSignups,
        posts: 0,
        activeAuthors: 0,
      });
    });

    contentStats.forEach((c) => {
      const existing = trendMap.get(c._id);
      if (existing) {
        existing.posts = c.posts;
        existing.activeAuthors = c.activeAuthors;
      } else {
        trendMap.set(c._id, {
          date: c._id,
          signups: 0,
          premiumSignups: 0,
          posts: c.posts,
          activeAuthors: c.activeAuthors,
        });
      }
    });

    return Array.from(trendMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
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
