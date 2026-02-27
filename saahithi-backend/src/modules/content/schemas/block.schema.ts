import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false })
export class Block {
  @Prop({ type: String, required: true })
  uuid!: string;

  @Prop({ type: String, required: true })
  type!: string;

  @Prop({ type: Object })
  styles?: Record<string, any>;

  @Prop({ type: Object })
  attributes?: Record<string, any>;

  // Recursive children: can be array of nodes or text
  @Prop({
    type: MongooseSchema.Types.Mixed,
  })
  children?: (Block | string)[];
}

export const BlockSchema = SchemaFactory.createForClass(Block);

// Enable recursion (embed schema inside itself)
BlockSchema.add({
  children: [{ type: MongooseSchema.Types.Mixed }],
});
