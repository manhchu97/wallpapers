
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWallpaperTable1729752801163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallpaper',
        columns: [
           {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'resource_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'thumbnail_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_timestamp',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallpaper');
  }
}
  