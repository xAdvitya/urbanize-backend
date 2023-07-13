import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dscription: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  available: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
