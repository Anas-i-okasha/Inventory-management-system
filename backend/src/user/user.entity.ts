import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  first_name: string;

  @Column({ type: 'varchar', length: 256 })
  last_name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'text'})
  password: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  phone_number: string;

  @CreateDateColumn({ type: 'date' })
  create_date: Date;

  @Column({ type: 'boolean'})
  is_deleted: boolean;
}
