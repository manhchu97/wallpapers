import { IsNotEmpty } from 'class-validator';

export class CreateTagsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: string;

}
