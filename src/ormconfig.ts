import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.TYPE as any) ?? 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) ?? 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: true,
  entities: ['**/*.entity{ .ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
