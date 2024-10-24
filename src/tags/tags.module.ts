import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tags } from './entities/tags.entity';
import { Files } from 'src/files/entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags,Files])],
  controllers: [TagsController],
  providers: [tagsService],
})
export class tagsModule {}
