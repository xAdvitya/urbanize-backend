import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './Product';
import { Wishlist } from './Wishlist';
import { Review } from './Review';
import { Order } from './Order';
import { Cart } from './Cart';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.creator)
  wishlist: Wishlist[];

  @OneToMany(() => Review, (review) => review.creator)
  review: Review[];

  @OneToMany(() => Order, (order) => order.creator)
  order: Order[];

  @OneToMany(() => Cart, (cart) => cart.creator)
  cart: Cart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
