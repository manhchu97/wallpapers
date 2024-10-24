
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRolesDto: CreateRolesDto) {
    return this.rolesService.create(createRolesDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.rolesService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
    return this.rolesService.update(id, updateRolesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
  