
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WallpaperTagsService } from './wallpapertags.service';
import { WallpaperTagsController } from './wallpapertags.controller';
import { WallpaperTags } from './entities/wallpapertags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WallpaperTags])],
  controllers: [WallpaperTagsController],
  providers: [WallpaperTagsService],
})
export class WallpaperTagsModule {}
  