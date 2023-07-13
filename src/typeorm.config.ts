import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Product } from './entities/Products';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [Product],
  synchronize: true,
});
