import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Wishlist } from './Wishlist';
import { Review } from './Review';

@Entity()
export class Order extends BaseEntity {}
