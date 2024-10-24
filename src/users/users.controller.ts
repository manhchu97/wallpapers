
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.usersService.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
  