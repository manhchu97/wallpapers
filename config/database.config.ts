import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Tải biến môi trường từ tệp .env

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: false, // Tắt tự động đồng bộ hóa trong môi trường production
});