import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { Model, Types } from 'mongoose';
// import { AdminService } from '../admin/admin.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<Content>,
    // private adminService: AdminService,
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

    // await this.adminService.emitLiveUpdate();

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
    return this.contentModel.countDocuments();
  }

  async countPublished() {
    return this.contentModel.countDocuments({ isPublished: true });
  }

  async getAllCategories() {
    return this.contentModel.distinct('category');
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
      { $group: { _id: '$author', postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          authorId: '$user._id',
          name: '$user.name',
          postCount: 1,
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
      .select('title category createdAt');
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
