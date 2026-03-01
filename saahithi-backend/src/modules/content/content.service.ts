import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { Model, Types } from 'mongoose';
import { ContentEvents } from '@/common/events/content.events';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<Content>,
    private readonly contentEvents: ContentEvents,
  ) {}

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }

  async create(
    createDto: CreateContentDto,
    authorId: string,
  ): Promise<ContentDocument | null> {
    const slugBase = createDto.slug || createDto.title;
    let finalSlug = this.slugify(slugBase);

    const existing = await this.contentModel
      .findOne({ slug: finalSlug })
      .exec();
    if (existing) {
      finalSlug = `${finalSlug}-${Math.floor(Math.random() * 10000)}`;
    }

    const created = new this.contentModel({
      ...createDto,
      slug: finalSlug,
      author: new Types.ObjectId(authorId),
    });

    this.contentEvents.emitContentCreated({
      id: created._id?.toString(),
      title: created.title,
      author: created.author?.toString(),
      category: created.category,
    });

    return created.save();
  }

  async update(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<ContentDocument | null> {
    const existingContent = await this.contentModel
      .findByIdAndUpdate(id, updateContentDto, { new: true })
      .exec();

    if (!existingContent) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return existingContent;
  }

  async findOne(id: string): Promise<ContentDocument | null> {
    const content = await this.contentModel.findById(id).exec();
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async findAll(): Promise<ContentDocument[]> {
    return this.contentModel.find().select('title').exec();
  }

  async findUserContent(author: string): Promise<ContentDocument[]> {
    return this.contentModel.find({ author }).select('title').exec();
  }

  async saveAsDraft(id: string): Promise<ContentDocument | null> {
    const drafted = this.contentModel.findByIdAndUpdate(
      id,
      { $set: { isPublished: false } },
      { new: true },
    );
    if (!drafted) throw new NotFoundException('Content not found');
    return drafted;
  }

  async publishContent(id: string): Promise<ContentDocument | null> {
    const published = this.contentModel.findByIdAndUpdate(
      id,
      { $set: { isPublished: true } },
      { new: true }, // return the updated document
    );
    if (!published) throw new NotFoundException('Content not found');
    return published;
  }

  async softDelete(id: string): Promise<ContentDocument | null> {
    const trashed = await this.contentModel
      .findByIdAndUpdate(id, { $set: { isTrashed: true } }, { new: true })
      .exec();
    if (!trashed) throw new NotFoundException('Content not found');
    return trashed;
  }

  async restore(id: string): Promise<ContentDocument | null> {
    const restored = await this.contentModel
      .findByIdAndUpdate(id, { $set: { isTrashed: false } }, { new: true })
      .exec();
    if (!restored) throw new NotFoundException('Content not found');
    return restored;
  }

  async permanentDelete(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.contentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Content not found');
    return { deleted: true, id };
  }

  // FOR ADMIN USE

  async countAll() {
    return this.contentModel.countDocuments().exec();
  }

  async countPublished() {
    return this.contentModel.countDocuments({ isPublished: true }).exec();
  }

  async getAllCategories() {
    // return this.contentModel.distinct('category',  { isPublished: true }).exec();
    return this.contentModel.distinct('category').exec();
  }

  async calculateGrowth() {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [thisMonth, lastMonth] = await Promise.all([
      this.contentModel.countDocuments({
        createdAt: { $gte: startOfThisMonth },
      }),
      this.contentModel.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
      }),
    ]);

    const growth =
      lastMonth === 0
        ? thisMonth > 0
          ? 100
          : 0
        : ((thisMonth - lastMonth) / lastMonth) * 100;
    return { thisMonth, lastMonth, growth: Number(growth.toFixed(2)) };
  }

  async getMostActiveAuthors() {
    const authors = await this.contentModel.aggregate([
      // Group by the author field (assuming it holds the User ID)
      { $group: { _id: '$author', postCount: { $sum: 1 } } },

      // Sort by highest count and limit
      { $sort: { postCount: -1 } },
      { $limit: 5 },

      // Join with the users collection
      {
        $lookup: {
          from: 'users', // Double-check this is exactly your collection name
          localField: '_id', // The author ID from the group stage
          foreignField: '_id', // The ID in the users collection
          as: 'userDetails',
        },
      },

      // Convert userDetails array to an object
      { $unwind: '$userDetails' },

      // Shape the final output
      {
        $project: {
          _id: 0,
          postCount: 1,
          author: {
            id: '$userDetails._id',
            name: {
              $concat: [
                { $ifNull: ['$userDetails.firstName', ''] },
                ' ',
                { $ifNull: ['$userDetails.lastName', ''] },
              ],
            },
            email: '$userDetails.email',
          },
        },
      },
    ]);

    return authors;
  }

  async getRecentPosts() {
    return this.contentModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'author',
        select: 'firstName lastName email',
      })
      .select('title category author createdAt')
      .lean()
      .exec();
  }

  async getCategoryDistribution() {
    const totalPosts = await this.contentModel.countDocuments();
    if (totalPosts === 0) return [];

    const categories = await this.contentModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    return categories.map((c) => ({
      category: c._id,
      count: c.count,
      percentage: Math.round((c.count / totalPosts) * 100),
    }));
  }

  async getProgressData(range: 'day' | 'week' | 'month' | 'year') {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return this.contentModel.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }
}
