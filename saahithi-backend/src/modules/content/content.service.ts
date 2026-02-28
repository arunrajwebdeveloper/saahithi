import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
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
}
