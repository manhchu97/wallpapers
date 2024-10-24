
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { tagsService } from './tags.service';
import { UpdatetagsDto } from './dto/update-tags.dto';
import { CreateTagsDto } from './dto/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: tagsService) {}

  @Post()
  create(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.create(createTagsDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.tagsService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatetagsDto: UpdatetagsDto) {
    return this.tagsService.update(+id, updatetagsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
  