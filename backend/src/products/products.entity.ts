import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  stock_quantity: number;

  @CreateDateColumn({ type: 'date' })
  create_date: Date;
}
