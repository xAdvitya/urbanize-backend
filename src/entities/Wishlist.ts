import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Product } from './Product';

@Entity()
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
