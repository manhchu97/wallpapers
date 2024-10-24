
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { platformVideoService } from './platform_videos.service';
import { Createplatform_videosDto } from './dto/create-platform_videos.dto';
import { Updateplatform_videosDto } from './dto/update-platform_videos.dto';

@Controller('platform_videos')
export class platformVideoController {
  constructor(private readonly platformVideoService: platformVideoService) {}

  @Post()
  create(@Body() createplatform_videosDto: Createplatform_videosDto) {
    return this.platformVideoService.create(createplatform_videosDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.platformVideoService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformVideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateplatform_videosDto: Updateplatform_videosDto) {
    return this.platformVideoService.update(+id, updateplatform_videosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformVideoService.remove(+id);
  }
}
  