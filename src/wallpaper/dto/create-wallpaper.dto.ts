
import { IsNotEmpty } from 'class-validator';

export class CreateWallpaperDto {
  @IsNotEmpty()
  resourceId: string;
  @IsNotEmpty()
  image_id: string;
  @IsNotEmpty()
  thumbnailid: string;
}
  