import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';
import { Block, BlockSchema } from './block.schema';
import { User } from '@/modules/users/schemas/user.schema';

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
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop()
  slug?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author!: Types.ObjectId | User;

  @Prop({
    type: String,
    enum: Object.values(ContentCategory),
    // default: ContentCategory.Article,
    required: true,
  })
  category!: ContentCategory;

  @Prop({ type: [BlockSchema], default: [] })
  nodes!: Block[];

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: false })
  isTrashed!: boolean;

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
