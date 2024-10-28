import { Wallpaper } from 'src/wallpaper/entities/wallpaper.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Stats {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column('uuid', { name: 'wallpaper_id' })
  wallpaperId: string;

  @Column('integer', { name: 'views_count' })
  viewsCount: number;

  @Column('integer', { name: 'likes_count' })
  likesCount: number;

  @Column('integer', { name: 'downloads_count' })
  downloadsCount: number;

  @Column('integer', { name: 'shares_count' })
  sharesCount: number;

  @Column('timestamp', {
    name: 'created_timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTimestamp: Date;

  @Column('timestamp', { name: 'updated_timestamp', nullable: true })
  updatedTimestamp: Date | null;

  @DeleteDateColumn({ name: 'deleted_timestamp' })
  deletedTimestamp: Date;


  @OneToOne(() => Wallpaper, (wallpaper) => wallpaper.stats, {
    nullable: true,
  })
  @JoinColumn({ name: 'wallpaper_id' })
  wallpaper: Wallpaper;
}
