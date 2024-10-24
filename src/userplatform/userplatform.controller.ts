import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserPlatformService } from './userplatform.service';
import { CreateUserPlatformDto } from './dto/create-userplatform.dto';
import { UpdateUserPlatformDto } from './dto/update-userplatform.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';

@Controller('user-platform')
export class UserPlatformController {
  constructor(private readonly userplatformService: UserPlatformService) {}

  @Post()
  create(@Body() createUserPlatformDto: CreateUserPlatformDto) {
    return this.userplatformService.create(createUserPlatformDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
    @Req() req: Request,
  ) {
    return this.userplatformService.findAll(
      { page, limit },
      {
        ...query,
        userId: req.user.id,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userplatformService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPlatformDto: UpdateUserPlatformDto,
  ) {
    return this.userplatformService.update(+id, updateUserPlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userplatformService.remove(+id);
  }
}
