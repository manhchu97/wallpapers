import { IsNotEmpty } from 'class-validator';

export class CreateWallpaperLivesDto {
  @IsNotEmpty()
  wallpaperId: string;
  @IsNotEmpty()
  fileId: string;
}
