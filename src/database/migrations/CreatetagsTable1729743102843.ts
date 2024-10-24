import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatetagsTable1729743102843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'uuid', 
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'slug',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'resource_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'preview_id',
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
            isNullable: false, // Có thể thêm isNullable nếu cần thiết
            default: 'CURRENT_TIMESTAMP', // Đảm bảo rằng không có lỗi cú pháp
          },
          {
            name: 'updated_timestamp',
            type: 'timestamp',
            isNullable: false, // Có thể thêm isNullable nếu cần thiết
            default: 'CURRENT_TIMESTAMP', // Đảm bảo rằng không có lỗi cú pháp
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
    await queryRunner.dropTable('tags');
  }
}