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

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsEnum(ContentCategory)
  @IsNotEmpty()
  category!: ContentCategory;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  nodes!: BlockDto[];

  @IsBoolean()
  isPublished!: boolean;

  @IsBoolean()
  isTrashed!: boolean;
}
