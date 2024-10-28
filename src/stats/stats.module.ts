
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Stats } from './entities/stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
  