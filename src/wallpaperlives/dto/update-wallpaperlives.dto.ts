
import { PartialType } from '@nestjs/mapped-types';
import { CreateWallpaperLivesDto } from './create-wallpaperlives.dto';

export class UpdateWallpaperLivesDto extends PartialType(CreateWallpaperLivesDto) {}
  