import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;
  
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
