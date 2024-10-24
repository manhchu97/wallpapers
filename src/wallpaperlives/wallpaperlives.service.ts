import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateWallpaperLivesDto } from './dto/create-wallpaperlives.dto';
import { UpdateWallpaperLivesDto } from './dto/update-wallpaperlives.dto';
import { WallpaperLives } from './entities/wallpaperlives.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class WallpaperLivesService {
  constructor(
    @InjectRepository(WallpaperLives)
    private readonly wallpaperlivesRepository: Repository<WallpaperLives>,
  ) {}

  async create(
    createWallpaperLivesDto: CreateWallpaperLivesDto,
  ): Promise<WallpaperLives> {
    const wallpaperlives = this.wallpaperlivesRepository.create(
      createWallpaperLivesDto,
    );
    return this.wallpaperlivesRepository.save(wallpaperlives);
  }

  async findAll(options: IPaginationOptions, query) {
    const queryBuilder: SelectQueryBuilder<WallpaperLives> =
      this.wallpaperlivesRepository.createQueryBuilder('wallpaperlives');
    return paginate<WallpaperLives>(queryBuilder, options);
  }

  async findOne(id: string): Promise<WallpaperLives> {
    return this.wallpaperlivesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateWallpaperLivesDto: UpdateWallpaperLivesDto,
  ): Promise<WallpaperLives> {
    await this.wallpaperlivesRepository.update(id, updateWallpaperLivesDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.wallpaperlivesRepository.delete(id);
  }
}
