import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './User';
import { Wishlist } from './Wishlist';
import { Review } from './Review';
import { Order } from './Order';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column()
  available!: boolean;

  @Column()
  creatorId!: number;

  @ManyToOne(() => User, (user) => user.products)
  creator: User;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlist: Wishlist[];

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  @OneToMany(() => Order, (order) => order.product)
  order: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
