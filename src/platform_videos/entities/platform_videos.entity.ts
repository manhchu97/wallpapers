import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class PlatformVideos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { name: 'user_platform_id' })
  userPlatformId: number;

  @Column('bigint', { name: 'category_id' })
  categoryId: number;

  @Column('varchar', { name: 'source_id' })
  sourceId: string;

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('text', { name: 'title' })
  title: number;

  @Column('text', { name: 'description' })
  description: number;

  @Column('timestamp', { name: 'public_time' })
  publicTime: string;

  @Column('timestamp', {
    name: 'created_timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTimestamp: Date;

  @Column('timestamp', { name: 'updated_timestamp', nullable: true })
  updatedTimestamp: Date | null;

  @DeleteDateColumn({ name: 'deleted_timestamp' })
  deletedTimestamp: Date;
}
