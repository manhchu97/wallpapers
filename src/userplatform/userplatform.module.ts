
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPlatformService } from './userplatform.service';
import { UserPlatformController } from './userplatform.controller';
import { UserPlatform } from './entities/userplatform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPlatform])],
  controllers: [UserPlatformController],
  providers: [UserPlatformService],
  exports : [UserPlatformService]
})
export class UserPlatformModule {}
  