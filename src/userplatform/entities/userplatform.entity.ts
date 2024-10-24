import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export const PLATFORM = {
  YOUTUBE: 'YOUTUBE',
};

@Entity()
export class UserPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'platform' })
  platform: string;

  @Column('text', { name: 'access_token' })
  accessToken: number;

  @Column('text', { name: 'refresh_token' })
  refreshToken: number;

  @Column('varchar', { name: 'source_id' })
  sourceId: string;

  @Column('varchar', { name: 'first_name' })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('text', { name: 'picture' })
  picture: number;

  @Column('int', { name: 'subscriber' })
  subscriber: number;

  @Column('int', { name: 'view_count' })
  viewCount: number;

  @Column('int', { name: 'video_count' })
  videoCount: number;

  @Column('varchar', { name: 'channel_name' })
  channelName: string;
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
