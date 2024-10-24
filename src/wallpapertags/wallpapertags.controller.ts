
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { WallpaperTagsService } from './wallpapertags.service';
import { CreateWallpaperTagsDto } from './dto/create-wallpapertags.dto';
import { UpdateWallpaperTagsDto } from './dto/update-wallpapertags.dto';

@Controller('wallpapertags')
export class WallpaperTagsController {
  constructor(private readonly wallpapertagsService: WallpaperTagsService) {}

  @Post()
  create(@Body() createWallpaperTagsDto: CreateWallpaperTagsDto) {
    return this.wallpapertagsService.create(createWallpaperTagsDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.wallpapertagsService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wallpapertagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWallpaperTagsDto: UpdateWallpaperTagsDto) {
    return this.wallpapertagsService.update(id, updateWallpaperTagsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wallpapertagsService.remove(id);
  }
}
  