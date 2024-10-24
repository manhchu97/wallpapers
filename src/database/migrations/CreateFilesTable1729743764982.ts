
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilesTable1729743764982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
           {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'file_path',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'width',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'height',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'hash',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ext',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'preview_path',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'preview_animation',
            type: 'varchar',
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
    await queryRunner.dropTable('files');
  }
}
  