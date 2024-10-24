
import { PartialType } from '@nestjs/mapped-types';
import { CreateWallpaperTagsDto } from './create-wallpapertags.dto';

export class UpdateWallpaperTagsDto extends PartialType(CreateWallpaperTagsDto) {}
  