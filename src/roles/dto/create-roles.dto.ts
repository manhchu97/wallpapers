
import { IsNotEmpty } from 'class-validator';

export class CreateRolesDto {
  @IsNotEmpty()
  title: string;
}
  