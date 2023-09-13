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

  @Column()
  creatorId!: number;
  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  productId!: number;
  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
