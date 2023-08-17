import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './User';
import { Wishlist } from './Wishlist';
import { Review } from './Review';
import { OrderItem } from './OrderItem';
import { Brand } from './Brand';

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

  @ManyToOne(() => Brand, (brand) => brand.brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlist: Wishlist[];

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  @OneToMany(() => OrderItem, (orderitem) => orderitem.product)
  order: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
