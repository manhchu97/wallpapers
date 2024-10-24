import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'first_name' })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('int', { name: 'role_id' })
  roleId: number;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'status' })
  status: string;

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
