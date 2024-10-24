import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserPlatformDto } from './dto/create-userplatform.dto';
import { UpdateUserPlatformDto } from './dto/update-userplatform.dto';
import { UserPlatform } from './entities/userplatform.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserPlatformService {
  constructor(
    @InjectRepository(UserPlatform)
    private readonly userplatformRepository: Repository<UserPlatform>,
  ) {}

  async create(
    createUserPlatformDto: CreateUserPlatformDto,
  ): Promise<UserPlatform> {
    const userplatform = this.userplatformRepository.create(
      createUserPlatformDto,
    );
    return this.userplatformRepository.save(userplatform);
  }

  async findAll(options: IPaginationOptions, query) {
    console.log(query)
    const queryBuilder: SelectQueryBuilder<UserPlatform> =
      this.userplatformRepository
        .createQueryBuilder('userplatform')
        .where(`userplatform.userId =:userId`, { userId: query.userId });

    return paginate<UserPlatform>(queryBuilder, options);
  }

  async findOne(id: number): Promise<UserPlatform> {
    return this.userplatformRepository.findOne({
      where: {
        id,
      },
    });
  }

  async find(options): Promise<UserPlatform> {
    return this.userplatformRepository.findOne(options);
  }

  async update(
    id: number,
    updateUserPlatformDto: UpdateUserPlatformDto,
  ): Promise<UserPlatform> {
    await this.userplatformRepository.update(id, updateUserPlatformDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userplatformRepository.delete(id);
  }
}
