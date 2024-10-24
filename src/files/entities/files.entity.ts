import { Tags } from 'src/tags/entities/tags.entity';
import { Wallpaper } from 'src/wallpaper/entities/wallpaper.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Files {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'file_path' })
  filePath: number;

  @Column('bigint', { name: 'width' })
  width: number;

  @Column('bigint', { name: 'height' })
  height: number;

  @Column('varchar', { name: 'hash' })
  hash: string;

  @Column('varchar', { name: 'ext' })
  ext: string;

  @Column('varchar', { name: 'mime' })
  mime: string;

  @Column('varchar', { name: 'size' })
  size: string;

  @Column('text', { name: 'preview_path' })
  previewPath: number;

  @Column('varchar', { name: 'preview_animation' })
  previewAnimation: string;

  @Column('timestamp', {
    name: 'created_timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTimestamp: Date;

  @Column('timestamp', { name: 'updated_timestamp', nullable: true })
  updatedTimestamp: Date | null;

  @DeleteDateColumn({ name: 'deleted_timestamp' })
  deletedTimestamp: Date;

  @OneToOne(() => Tags, (tag) => tag.image, { persistence: false })
  previewTag?: File[];

  @OneToOne(() => Tags, (tag) => tag.thumbnail, { persistence: false })
  thumbnailTag?: File[];

  @OneToOne(() => Wallpaper, (wallpaper) => wallpaper.image, { persistence: false })
  imageWallpaper?: File[];


  @OneToOne(() => Wallpaper, (wallpaper) => wallpaper.thumbnail, { persistence: false })
  thumbnailWallpaper?: File[];


  @ManyToMany(() => Wallpaper, (wallpaper) => wallpaper.lives, { persistence: false })
  @JoinTable({
    name: 'wallpaper_lives',
    joinColumn: { name: 'file_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'wallpaper_id', referencedColumnName: 'id' },
  })
  wallpapers?: Wallpaper[];
}
