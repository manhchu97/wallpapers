
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { Roles } from './entities/roles.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createRolesDto: CreateRolesDto): Promise<Roles> {
    const roles = this.rolesRepository.create(createRolesDto);
    return this.rolesRepository.save(roles);
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<Roles> = this.rolesRepository.createQueryBuilder('roles')
    return paginate<Roles>(queryBuilder, options);
  }

  async findOne(id: number): Promise<Roles> {
    return this.rolesRepository.findOne({
      where : {
        id
      }
    });
  }

  async update(id: number, updateRolesDto: UpdateRolesDto): Promise<Roles> {
    await this.rolesRepository.update(id, updateRolesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
  