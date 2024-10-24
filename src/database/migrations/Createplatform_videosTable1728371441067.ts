
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Createplatform_videosTable1728371441067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'platform_videos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_platform_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'source_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'public_time',
            type: 'timestamp',
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
    await queryRunner.dropTable('platform_videos');
  }
}
  