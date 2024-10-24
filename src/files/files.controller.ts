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
import { FilesService } from './files.service';
import { CreateFilesDto } from './dto/create-files.dto';
import { UpdateFilesDto } from './dto/update-files.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFilesDto: CreateFilesDto) {
    return this.filesService.create(createFilesDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.filesService.findAll({ page, limit }, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilesDto: UpdateFilesDto) {
    return this.filesService.update(id, updateFilesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
