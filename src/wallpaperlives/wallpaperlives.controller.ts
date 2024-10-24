
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { WallpaperLivesService } from './wallpaperlives.service';
import { CreateWallpaperLivesDto } from './dto/create-wallpaperlives.dto';
import { UpdateWallpaperLivesDto } from './dto/update-wallpaperlives.dto';

@Controller('wallpaperlives')
export class WallpaperLivesController {
  constructor(private readonly wallpaperlivesService: WallpaperLivesService) {}

  @Post()
  create(@Body() createWallpaperLivesDto: CreateWallpaperLivesDto) {
    return this.wallpaperlivesService.create(createWallpaperLivesDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.wallpaperlivesService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wallpaperlivesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWallpaperLivesDto: UpdateWallpaperLivesDto) {
    return this.wallpaperlivesService.update(id, updateWallpaperLivesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wallpaperlivesService.remove(id);
  }
}
  