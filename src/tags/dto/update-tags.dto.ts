
import { PartialType } from '@nestjs/mapped-types';
import { CreateTagsDto } from './create-tags.dto';

export class UpdatetagsDto extends PartialType(CreateTagsDto) {}
  