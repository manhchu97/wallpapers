import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from 'config/database.config';
import { UsersModule } from './users/users.module';
import { UserPlatform } from './userplatform/entities/userplatform.entity';
import { PlatformVideosModule } from './platform_videos/platform_videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để các cấu hình có sẵn trên toàn bộ ứng dụng
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    AuthModule,
    UsersModule,
    UserPlatform,
    PlatformVideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
