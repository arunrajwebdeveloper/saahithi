import { PartialType } from '@nestjs/mapped-types';
import { CreateContentCreationDto } from './create-content-creation.dto';

export class UpdateContentCreationDto extends PartialType(CreateContentCreationDto) {}
