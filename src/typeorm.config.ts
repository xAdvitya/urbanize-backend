import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Product } from './entities/Product';
import { User } from './entities/User';
import { Wishlist } from './entities/Wishlist';
import { Review } from './entities/Review';
import { Order } from './entities/Order';
import { Brand } from './entities/Brand';
import { OrderItem } from './entities/OrderItem';
import { Category } from './entities/Category';
import { ProductImage } from './entities/ProductImage';
import { Cart } from './entities/Cart';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [
    User,
    Product,
    Wishlist,
    Review,
    Order,
    OrderItem,
    Brand,
    Category,
    ProductImage,
    Cart,
  ],
  synchronize: true,
});
