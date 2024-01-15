import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductsEntity } from './products.entity';
import { UsersEntity } from 'src/user/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @ManyToMany(() => ProductsEntity)
  @JoinTable()
  products: ProductsEntity[];

  @Column({ type: 'integer' })
  total_amount: number;
}
