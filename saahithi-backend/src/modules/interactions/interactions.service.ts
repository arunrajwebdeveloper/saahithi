import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Content } from '../content/schemas/content.schema';
import { User } from '../users/schemas/user.schema';
import { Interaction } from './schemas/interaction.schema';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name) private interactionModel: Model<Interaction>,
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async handleView(contentId: string, userId?: string, ip?: string) {
    // Log the interaction
    await this.interactionModel.create({
      contentId,
      userId,
      ipAddress: ip,
      type: 'view',
    });

    //  Increment views on content
    const content = await this.contentModel.findByIdAndUpdate(
      contentId,
      { $inc: { views: 1 } },
      { new: true },
    );

    // Personalized Interest Discovery (If user is logged in)
    if (userId && content) {
      await this.userModel.findByIdAndUpdate(userId, {
        $addToSet: { interests: content.category }, // Adds category to interests if not already there
      });
    }

    return { success: true };
  }

  // async getUserActivity(userId: string, limit: number = 20) {
  //   return this.interactionModel
  //     .find({ userId: new Types.ObjectId(userId) })
  //     .sort({ createdAt: -1 }) // Newest first
  //     .limit(limit)
  //     .populate({
  //       path: 'contentId',
  //       select: 'title slug category', // Only pull what we need for the log
  //     })
  //     .exec();
  // }

  async getUserActivity(userId: string, limit: number = 20) {
    return this.interactionModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$contentId',
          lastAction: { $first: '$type' },
          timestamp: { $first: '$createdAt' },
        },
      },
      {
        $lookup: {
          from: 'contents',
          localField: '_id',
          foreignField: '_id',
          as: 'details',
        },
      },
      { $unwind: '$details' },
      { $limit: limit },
    ]);
  }
}
