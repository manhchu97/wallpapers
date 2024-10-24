import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UpdatetagsDto } from './dto/update-tags.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Tags } from './entities/tags.entity';
import { CreateTagsDto } from './dto/create-tags.dto';

@Injectable()
export class tagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  async create(createtagsDto: CreateTagsDto): Promise<Tags> {
    const tags = this.tagsRepository.create(createtagsDto);
    return this.tagsRepository.save(tags);
  }

  async findAll(options: IPaginationOptions, query) {
    const queryBuilder: SelectQueryBuilder<Tags> =
      this.tagsRepository.createQueryBuilder('tags');
    return paginate<Tags>(queryBuilder, options);
  }

  async findOne(id: number): Promise<Tags> {
    return this.tagsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatetagsDto: UpdatetagsDto): Promise<Tags> {
    await this.tagsRepository.update(id, updatetagsDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tagsRepository.delete(id);
  }
}
