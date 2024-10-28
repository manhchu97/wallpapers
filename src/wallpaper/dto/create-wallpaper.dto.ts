
import { IsNotEmpty } from 'class-validator';

export class CreateWallpaperDto {
  @IsNotEmpty()
  resourceId: number;
  @IsNotEmpty()
  image_id: string;
  @IsNotEmpty()
  thumbnailid: string;
}
  