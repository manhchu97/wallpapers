import { Files } from 'src/files/entities/files.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Wallpaper {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { name: 'resource_id' })
  resourceId: string;

  @Column('varchar', { name: 'image_id' })
  imageId: string;

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

  @OneToOne(() => Files, (file) => file.imageWallpaper, {
    nullable: true,
  })
  @JoinColumn({ name: 'image_id' })
  image: Files;

  @OneToOne(() => Files, (file) => file.thumbnailWallpaper, {
    nullable: true,
  })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: Files;

  @ManyToMany(() => Files, (file) => file.wallpapers, {
    persistence: false,
  })
  @JoinTable({
    name: 'wallpaper_lives',
    joinColumn: { name: 'wallpaper_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' },
  })
  lives?: Files[];


  @ManyToMany(() => Tags, (tag) => tag.wallpapers, {
    persistence: false,
  })
  @JoinTable({
    name: 'wallpaper_tags',
    joinColumn: { name: 'wallpaper_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags?: Tags[];
}
