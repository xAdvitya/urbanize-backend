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
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  rating!: number;

  @Column()
  review_text!: string;

  @Column()
  creatorId!: number;
  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  productId!: number;
  @ManyToOne(() => Product, (product) => product.review)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
