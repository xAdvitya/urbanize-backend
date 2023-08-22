import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @OneToMany(() => Product, (product) => product.creator)
  product: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
