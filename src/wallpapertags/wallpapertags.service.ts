
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { CreateWallpaperTagsDto } from './dto/create-wallpapertags.dto';
import { UpdateWallpaperTagsDto } from './dto/update-wallpapertags.dto';
import { WallpaperTags } from './entities/wallpapertags.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class WallpaperTagsService {
  constructor(
    @InjectRepository(WallpaperTags)
    private readonly wallpapertagsRepository: Repository<WallpaperTags>,
  ) {}

  async create(createWallpaperTagsDto: CreateWallpaperTagsDto): Promise<WallpaperTags> {
    const wallpapertags = this.wallpapertagsRepository.create(createWallpaperTagsDto);
    return this.wallpapertagsRepository.save(wallpapertags);
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<WallpaperTags> = this.wallpapertagsRepository.createQueryBuilder('wallpapertags')
    return paginate<WallpaperTags>(queryBuilder, options);
  }

  async findOne(id: string): Promise<WallpaperTags> {
    return this.wallpapertagsRepository.findOne({
      where : {
        id
      }
    });
  }

  async update(id: string, updateWallpaperTagsDto: UpdateWallpaperTagsDto): Promise<WallpaperTags> {
    await this.wallpapertagsRepository.update(id, updateWallpaperTagsDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.wallpapertagsRepository.delete(id);
  }
}
  