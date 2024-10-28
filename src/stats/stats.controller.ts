import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { STATS_ACTION } from './stats.const';

@Controller('hit')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('like')
  hitLike(@Body() body: any) {
    return this.statsService.hit({
      action: STATS_ACTION.LIKES_COUNT,
      wallpaperId: body.wallpaperId,
    });
  }

  @Post('view')
  hitView(@Body() body: any) {
    return this.statsService.hit({
      action: STATS_ACTION.VIEWS_COUNT,
      wallpaperId: body.wallpaperId,
    });
  }

  @Post('download')
  hitDownload(@Body() body: any) {
    return this.statsService.hit({
      action: STATS_ACTION.DOWNLOADS_COUNT,
      wallpaperId: body.wallpaperId,
    });
  }

  @Post('share')
  hitShare(@Body() body: any) {
    return this.statsService.hit({
      action: STATS_ACTION.SHARES_COUNT,
      wallpaperId: body.wallpaperId,
    });
  }
}
