import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal' })
  unit_price!: number;

  @Column({ type: 'decimal', nullable: true })
  subtotal!: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @BeforeInsert()
  //   async setProductPrice() {
  //     if (this.product) {
  //       const fetchedProduct = await Product.findOne({
  //         where: { id: this.product.id },
  //       });
  //       if (fetchedProduct) {
  //         const productPrice = fetchedProduct.price;
  //         this.unit_price = productPrice;
  //       }
  //     }
  //   }
  //   @BeforeInsert()
  //   async setSubtotal() {
  //     this.subtotal = this.unit_price * this.quantity;
  //   }
}
