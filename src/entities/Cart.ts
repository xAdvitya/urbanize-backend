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
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  creatorId!: number;
  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  productId!: number;
  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
