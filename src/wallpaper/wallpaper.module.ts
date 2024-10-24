
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WallpaperService } from './wallpaper.service';
import { WallpaperController } from './wallpaper.controller';
import { Wallpaper } from './entities/wallpaper.entity';
import { WallpaperTags } from 'src/wallpapertags/entities/wallpapertags.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import { Files } from 'src/files/entities/files.entity';
import { WallpaperLives } from 'src/wallpaperlives/entities/wallpaperlives.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallpaper,WallpaperTags,Tags,Files,WallpaperLives])],
  controllers: [WallpaperController],
  providers: [WallpaperService],
})
export class WallpaperModule {}
  