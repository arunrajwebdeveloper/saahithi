import {
  IsString,
  IsObject,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';

export class BlockDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique ID for the block',
  })
  @IsString()
  uuid!: string;

  @ApiProperty({
    example: 'p',
    description: 'Type of content block',
  })
  @IsString()
  type!: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { color: '#000', fontSize: '16px' },
    description: 'CSS styles for the block',
  })
  @IsObject()
  @IsOptional()
  styles?: Record<string, any>;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { href: 'https://example.com' },
    description: 'Specific block attributes',
  })
  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      $ref: getSchemaPath(BlockDto),
    },
    description: 'Nested children blocks',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto) // This allows the recursive "children" nesting
  children?: BlockDto[];
}
