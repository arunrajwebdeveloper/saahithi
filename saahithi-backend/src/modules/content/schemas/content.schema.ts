import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';
import { Block, BlockSchema } from './block.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ContentCategory {
  Novel = 'novel',
  Poem = 'poem',
  Essay = 'essay',
  Drama = 'drama',
  Fable = 'fable',
  Article = 'article',
  Tutorial = 'tutorial',
  CaseStudy = 'caseStudy',
  Interview = 'interview',
}

export type ContentDocument = HydratedDocument<Content>;

@Schema({ timestamps: true })
export class Content {
  @ApiProperty({
    example: 'Your content title',
    description: 'The title of the content',
  })
  @Prop({ required: true, trim: true })
  title!: string;

  @ApiPropertyOptional({ example: 'your-content-title' })
  @Prop()
  slug?: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the author (User)',
    example: '65f1a2b3c4d5e6f7a8b9c0d1',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author!: Types.ObjectId | User;

  @ApiProperty({
    enum: ContentCategory,
    description: 'Category classification of the content',
  })
  @Prop({
    type: String,
    enum: Object.values(ContentCategory),
    // default: ContentCategory.Article,
    required: true,
  })
  category!: ContentCategory;

  @ApiProperty({
    type: () => [Block],
    description: 'Array of content blocks (nodes)',
    example: [
      {
        uuid: '550e8400-e29b-41d4-a716-446655440000',
        type: 'p',
        children: ['Hello World'],
      },
    ],
  })
  @Prop({ type: [BlockSchema], default: [] })
  nodes!: Block[];

  @ApiProperty({ default: false })
  @Prop({ default: false })
  isPublished!: boolean;

  @ApiProperty({ default: false, description: 'Soft delete flag' })
  @Prop({ default: false })
  isTrashed!: boolean;

  @ApiProperty({
    type: [String],
    example: ['image1_public_id', 'image2_public_id'],
    description: 'Registry of Cloudinary image public IDs used in this content',
  })
  @Prop({ type: [String], default: [], index: true })
  imageRegistry!: string[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);

ContentSchema.pre<ContentDocument>('save', async function () {
  const foundIds: string[] = [];

  // Recursive helper
  const traverse = (nodes: any[]) => {
    for (const node of nodes) {
      if (node.type === 'img' && node.attributes?.src) {
        foundIds.push(node.attributes.src);
      }
      if (node.children && Array.isArray(node.children)) {
        traverse(node.children);
      }
    }
  };

  if (this.nodes) {
    traverse(this.nodes);
    this.imageRegistry = [...new Set(foundIds)];
  }
});
