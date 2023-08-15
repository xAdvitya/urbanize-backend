import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { OrderItem } from './OrderItem';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.order)
  creator: User;

  @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
  orderItem: OrderItem[];

  @Column({ type: 'decimal' })
  price!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
