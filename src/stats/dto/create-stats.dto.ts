
import { IsNotEmpty } from 'class-validator';

export class CreateStatsDto {
  @IsNotEmpty()
  wallpaper_id: number;
  @IsNotEmpty()
  views_count: number;
  @IsNotEmpty()
  likes_count: number;
}
  