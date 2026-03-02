import {
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentCategory } from '../schemas/content.schema';
import { BlockDto } from './block.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({
    example: 'Title of the content',
    description: 'The display title of the content',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'slug-key-word',
    description: 'URL-friendly version of the title',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    enum: ContentCategory,
    example: ContentCategory.Article,
    description: 'The classification of this content',
  })
  @IsEnum(ContentCategory)
  @IsNotEmpty()
  category!: ContentCategory;

  @ApiProperty({
    type: () => [BlockDto],
    description: 'An array of structured content blocks',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  nodes!: BlockDto[];

  @ApiProperty({
    default: false,
    description: 'Whether the content is visible to the public',
  })
  @IsBoolean()
  isPublished!: boolean;

  @ApiProperty({
    default: false,
    description: 'Whether the content has been moved to trash',
  })
  @IsBoolean()
  isTrashed!: boolean;
}
