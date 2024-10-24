
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWallpaperTagsTable1729752880668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallpaper_tags',
        columns: [
           {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'wallpaper_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tag_id',
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
    await queryRunner.dropTable('wallpapertags');
  }
}
  