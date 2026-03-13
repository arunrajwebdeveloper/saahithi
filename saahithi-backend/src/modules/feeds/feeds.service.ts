import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Content } from '../content/schemas/content.schema';
import { User } from '../users/schemas/user.schema';
import { UserStatus } from '@/common/enums/user';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getDiscoveryFeed() {
    const [trendingContent, popularAuthors, hotCategories] = await Promise.all([
      // Trending: High views, published recently, not trashed
      this.contentModel
        .find({ isPublished: true, isTrashed: false })
        .sort({ views: -1, createdAt: -1 })
        .limit(10)
        .populate('author', 'firstName lastName avatarPublicId'),

      // Sidebar: Top Authors by follower count
      this.userModel
        .find({ status: 'active' })
        .sort({ followerCount: -1 })
        .limit(6)
        .select('firstName lastName avatarPublicId followerCount'),

      // Sidebar 2: Categories with most posts
      this.contentModel.aggregate([
        { $match: { isPublished: true, isTrashed: false } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    return {
      mainFeed: trendingContent,
      sidebar: {
        popularAuthors,
        trendingTopics: hotCategories.map((c) => ({
          name: c._id,
          postCount: c.count,
        })),
      },
    };
  }

  async getPersonalizedFeed(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const [personalizedContent, suggestedAuthors, relevantTopics] =
      await Promise.all([
        // Main: Match user interests or creators they follow
        this.contentModel
          .find({
            isPublished: true,
            isTrashed: false,
            $or: [
              { author: { $in: user.following } }, // Priority 1: People I follow
              { category: { $in: user.interests } }, // Priority 2: Topics I like
            ],
          })
          .sort({ createdAt: -1 })
          .limit(10)
          .populate('author', 'firstName lastName avatarPublicId')
          .exec(),

        // Sidebar: Authors who write in user's interest but not followed yet
        this.userModel
          .find({
            _id: {
              $ne: new Types.ObjectId(userId), // Not me
              $nin: user.following, // AND not someone I already follow
            },
            interests: { $in: user.interests },
            status: UserStatus.ACTIVE,
          })
          .limit(5)
          .select('firstName lastName avatarPublicId')
          .exec(),

        // Sidebar 2: Fresh content from user's most active interest
        this.contentModel
          .find({
            category: user.interests[0],
            isPublished: true,
          })
          .limit(5)
          .select('title slug'),
      ]);

    // Inject follow status into the main feed authors
    const feedWithStatus = personalizedContent.map((post) => {
      const authorId = (post.author as any)._id.toString();
      return {
        ...post.toObject(),
        author: {
          ...post.author,
          isFollowing: user.following.includes(new Types.ObjectId(authorId)),
        },
      };
    });

    return {
      mainFeed: feedWithStatus,
      sidebar: {
        suggestedAuthors,
        relevantTopics,
      },
    };
  }
}
