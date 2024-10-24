
import { IsNotEmpty } from 'class-validator';

export class CreateWallpaperTagsDto {
  @IsNotEmpty()
  wallpaper_id: string;
  @IsNotEmpty()
  tagId: string;
}
  