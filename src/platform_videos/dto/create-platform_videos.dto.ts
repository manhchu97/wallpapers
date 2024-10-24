
import { IsNotEmpty } from 'class-validator';

export class Createplatform_videosDto {
  @IsNotEmpty()
  user_platform_id: number;
  @IsNotEmpty()
  category_id: number;
  @IsNotEmpty()
  source_id: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  title: number;
  @IsNotEmpty()
  description: number;
  @IsNotEmpty()
  public_time: number;
}
  