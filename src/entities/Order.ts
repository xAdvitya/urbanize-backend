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
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.order)
  creator: User;

  @ManyToOne(() => Product, (product) => product.order)
  product: Product;

  @Column({ type: 'decimal' })
  price!: number;

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
        this.price = productPrice;
      }
    }
  }
}
