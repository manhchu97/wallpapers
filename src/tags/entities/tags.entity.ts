import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'slug' })
  slug: string;

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('varchar', { name: 'preview_id' })
  previewId: string;

  @Column('varchar', { name: 'thumbnail_id' })
  thumbnailId: string;

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
