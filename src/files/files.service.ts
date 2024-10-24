
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { CreateFilesDto } from './dto/create-files.dto';
import { UpdateFilesDto } from './dto/update-files.dto';
import { Files } from './entities/files.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  async create(createFilesDto: CreateFilesDto): Promise<Files> {
    const files = this.filesRepository.create(createFilesDto);
    return this.filesRepository.save(files);
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<Files> = this.filesRepository.createQueryBuilder('files')
    return paginate<Files>(queryBuilder, options);
  }

  async findOne(id: string): Promise<Files> {
    return this.filesRepository.findOne({
      where : {
        id
      }
    });
  }

  async update(id: string, updateFilesDto: UpdateFilesDto): Promise<Files> {
    await this.filesRepository.update(id, updateFilesDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.filesRepository.delete(id);
  }
}
  