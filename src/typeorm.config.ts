import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Product } from './entities/Product';
import { User } from './entities/User';
import { Wishlist } from './entities/Wishlist';
import { Review } from './entities/Review';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [User, Product, Wishlist, Review],
  synchronize: true,
});
