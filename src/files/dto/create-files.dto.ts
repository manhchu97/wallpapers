
import { IsNotEmpty } from 'class-validator';

export class CreateFilesDto {
  @IsNotEmpty()
  filePath: number;
  @IsNotEmpty()
  width: number;
  @IsNotEmpty()
  height: number;
  @IsNotEmpty()
  hash: string;
  @IsNotEmpty()
  ext: string;
  @IsNotEmpty()
  mime: string;
  @IsNotEmpty()
  size: string;
  @IsNotEmpty()
  previewPath: number;
  @IsNotEmpty()
  previewAnimation: string;
}
  