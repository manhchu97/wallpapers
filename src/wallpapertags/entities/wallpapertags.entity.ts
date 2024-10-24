import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('wallpaper_tags')
export class WallpaperTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'wallpaper_id' })
  wallpaperId: string;

  @Column('varchar', { name: 'tag_id' })
  tagId: string;

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
