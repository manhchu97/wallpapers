import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class WallpaperLives {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('varchar', { name: 'wallpaper_id' })
  wallpaperId: string;

  @Column('varchar', { name: 'file_id' })
  fileId: string;

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
