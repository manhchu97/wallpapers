
import { IsNotEmpty } from 'class-validator';

export class CreateUserPlatformDto {
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  platform: string;
  @IsNotEmpty()
  access_token: number;
  @IsNotEmpty()
  refresh_token: number;
  @IsNotEmpty()
  source_id: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  picture: number;
  @IsNotEmpty()
  subscriber: number;
  @IsNotEmpty()
  channel_name: string;
}
  