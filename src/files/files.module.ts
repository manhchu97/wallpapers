
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Files } from './entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
  