import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('product_transaction')
export class ProductTransaction {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  transaction_id: number;

  @ManyToOne(() => ProductsEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.products)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;

  @Column()
  quantity: number;
}
