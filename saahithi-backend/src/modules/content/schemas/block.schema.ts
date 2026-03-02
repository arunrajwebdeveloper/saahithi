import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false })
export class Block {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier for the block',
  })
  @Prop({ type: String, required: true })
  uuid!: string;

  @ApiProperty({
    example: 'paragraph',
    description: 'The type of block (e.g., paragraph, heading, image)',
  })
  @Prop({ type: String, required: true })
  type!: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { color: '#000', fontSize: '16px' },
    description: 'CSS styles for the block',
  })
  @Prop({ type: Object })
  styles?: Record<string, any>;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { href: 'https://google.com' },
    description: 'Specific attributes for the block type',
  })
  @Prop({ type: Object })
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(Block) }, { type: 'string' }],
    },
  })
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
