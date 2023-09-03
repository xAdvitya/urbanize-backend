import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  creatorId!: number;
  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
  orderItem: OrderItem[];

  @Column({ type: 'decimal' })
  total!: number;

  @Column()
  status!: string;

  // @Column()
  // address!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
