import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './videos.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('convert')
  async convert(@Body('url') m3u8Url: string, @Res() res: Response): Promise<void> {
    await this.videoService.convertM3U8ToLivePhoto(m3u8Url);
  }
}
