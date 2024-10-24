
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WallpaperLivesService } from './wallpaperlives.service';
import { WallpaperLivesController } from './wallpaperlives.controller';
import { WallpaperLives } from './entities/wallpaperlives.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WallpaperLives])],
  controllers: [WallpaperLivesController],
  providers: [WallpaperLivesService],
})
export class WallpaperLivesModule {}
  