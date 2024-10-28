import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateStatsDto } from './dto/create-stats.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';
import { Stats } from './entities/stats.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private readonly statsRepository: Repository<Stats>,
  ) {}

  async hit({ action, wallpaperId }) {
    let stats = await this.statsRepository.findOne({
      where: {
        wallpaperId,
      },
    });

    if (!stats) {
      stats = await this.statsRepository.save({
        wallpaperId,
        viewsCount: 0,
        likesCount: 0,
        downloadsCount: 0,
        sharesCount: 0,
      });
    }
    stats[action] += 1;
    await this.statsRepository.save(stats);

    return {
      oke: true,
    };
  }
}
