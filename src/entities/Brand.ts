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
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @OneToMany(() => Product, (product) => product.brand)
  brand: Brand[];
}
