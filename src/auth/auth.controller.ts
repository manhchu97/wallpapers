import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('youtube/callback')
  youtubeCallback(@Query('code') code: string, @Req() req: Request): any {
    return this.authService.handleCallbackYTB(req.user.sub, code);
  }

  @Post('register')
  register(@Body() data: RegisterDto): any {
    return this.authService.handleRegister(data);
  }

  @Post('login')
  login(@Body() data: LoginDto): any {
    return this.authService.handleLogin(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
