import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformVideos } from './entities/platform_videos.entity';
import { platformVideoController } from './platform_videos.controller';
import { platformVideoService } from './platform_videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformVideos])],
  controllers: [platformVideoController],
  providers: [platformVideoService],
})
export class PlatformVideosModule {}
