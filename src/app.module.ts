import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/database.config';
import { UsersModule } from './users/users.module';
import { tagsModule } from './tags/tags.module';
import { FilesModule } from './files/files.module';
import { WallpaperModule } from './wallpaper/wallpaper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để các cấu hình có sẵn trên toàn bộ ứng dụng
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UsersModule,
    tagsModule,
    FilesModule,
    WallpaperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
