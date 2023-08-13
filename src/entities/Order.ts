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

  @Column({ type: 'decimal' })
  price!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
