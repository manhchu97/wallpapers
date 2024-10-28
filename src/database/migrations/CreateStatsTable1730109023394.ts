import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatsTable1730109023394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stats',
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
            name: 'views_count',
            type: 'int',
            isNullable: true,
            default: 0,
          },
          {
            name: 'likes_count',
            type: 'int',
            isNullable: true,
            default: 0,
          },
          {
            name: 'downloads_count',
            type: 'int',
            isNullable: true,
            default: 0,
          },
          {
            name: 'shares_count',
            type: 'int',
            isNullable: true,
            default: 0,
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
    await queryRunner.dropTable('stats');
  }
}
