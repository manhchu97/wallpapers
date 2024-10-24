
import { PartialType } from '@nestjs/mapped-types';
import { Createplatform_videosDto } from './create-platform_videos.dto';

export class Updateplatform_videosDto extends PartialType(Createplatform_videosDto) {}
  