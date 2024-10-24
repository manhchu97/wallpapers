import { Files } from 'src/files/entities/files.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('varchar', { name: 'resource_id' })
  resourceId: string;

  @Column('text', { name: 'slug' })
  slug: string; 

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('uuid', { name: 'preview_id' })
  previewId: string;

  @Column('uuid', { name: 'thumbnail_id' })
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

  @OneToOne(() => Files, (file) => file.previewTag, {
    nullable: true,
  })
  @JoinColumn({ name: 'preview_id' })
  image: Files;

  @OneToOne(() => Files, (file) => file.thumbnailTag, {
    nullable: true,
  })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: Files;
}
