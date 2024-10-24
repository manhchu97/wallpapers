import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
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
}
