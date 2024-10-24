
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { Createplatform_videosDto } from './dto/create-platform_videos.dto';
import { Updateplatform_videosDto } from './dto/update-platform_videos.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PlatformVideos } from './entities/platform_videos.entity';

@Injectable()
export class platformVideoService {
  constructor(
    @InjectRepository(PlatformVideos)
    private readonly platformVideosRepo: Repository<PlatformVideos>,
  ) {}

  async create(createplatform_videosDto: Createplatform_videosDto): Promise<PlatformVideos> {
    const platform_videos = this.platformVideosRepo.create(createplatform_videosDto);
    return this.platformVideosRepo.save(platform_videos);
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<PlatformVideos> = this.platformVideosRepo.createQueryBuilder('platform_videos')
    return paginate<PlatformVideos>(queryBuilder, options);
  }

  async findOne(id: number): Promise<PlatformVideos> {
    return this.platformVideosRepo.findOne({
      where : {
        id
      }
    });
  }

  async update(id: number, updateplatform_videosDto: Updateplatform_videosDto): Promise<PlatformVideos> {
    await this.platformVideosRepo.update(id, updateplatform_videosDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.platformVideosRepo.delete(id);
  }
}
  