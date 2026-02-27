import {
  IsString,
  IsObject,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BlockDto {
  @IsString()
  uuid!: string;

  @IsString()
  type!: string;

  @IsObject()
  @IsOptional()
  styles?: Record<string, any>;

  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto) // This allows the recursive "children" nesting
  children?: BlockDto[];
}
