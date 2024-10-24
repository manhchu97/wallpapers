
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPlatformDto } from './create-userplatform.dto';

export class UpdateUserPlatformDto extends PartialType(CreateUserPlatformDto) {}
  