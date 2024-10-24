import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserPlatformTable1726941098032
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_platform',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'platform',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'access_token',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'refresh_token',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'source_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'picture',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'subscriber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'view_count',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'video_count',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'channel_name',
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
    await queryRunner.dropTable('userplatform');
  }
}
