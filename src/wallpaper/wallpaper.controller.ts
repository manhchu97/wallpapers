import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { WallpaperService } from './wallpaper.service';
import { CreateWallpaperDto } from './dto/create-wallpaper.dto';
import { UpdateWallpaperDto } from './dto/update-wallpaper.dto';

@Controller('wallpaper')
export class WallpaperController {
  constructor(private readonly wallpaperService: WallpaperService) {}

  @Get('init-wallpaper')
  async initWallpaper() {
    return await this.wallpaperService.init();
  }

  @Post()
  create(@Body() createWallpaperDto: CreateWallpaperDto) {
    return this.wallpaperService.create(createWallpaperDto);
  }

  @Get('ranked')
  findAllRank(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
  ) {
    return this.wallpaperService.findAllRank({ page, limit });
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
    @Query() query: any,
  ) {
    return this.wallpaperService.findAll({ page, limit }, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wallpaperService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWallpaperDto: UpdateWallpaperDto,
  ) {
    return this.wallpaperService.update(id, updateWallpaperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wallpaperService.remove(id);
  }
}
