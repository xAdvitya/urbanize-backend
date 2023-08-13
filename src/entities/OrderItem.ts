import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal' })
  unit_price!: number;

  @Column({ type: 'decimal' })
  subtotal!: number;

  @ManyToOne(() => Product, (product) => product.order)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setProductPrice() {
    if (this.product) {
      const fetchedProduct = await Product.findOne({
        where: { id: this.product.id },
      });
      if (fetchedProduct) {
        const productPrice = fetchedProduct.price;
        this.unit_price = productPrice;
      }
    }
  }
  @BeforeInsert()
  async setSubtotal() {
    this.subtotal = this.unit_price * this.quantity;
  }
}
