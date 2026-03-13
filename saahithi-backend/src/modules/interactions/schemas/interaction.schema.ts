import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type InteractionDocument = HydratedDocument<Interaction>;

@Schema({ timestamps: true })
export class Interaction {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
  userId?: Types.ObjectId; // Optional for guests

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Content', required: true })
  contentId!: Types.ObjectId;

  @Prop({ enum: ['view', 'like'], default: 'view' })
  type!: string;

  @Prop()
  ipAddress?: string; // To prevent guest view spam
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
InteractionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Auto-delete after 30 days
