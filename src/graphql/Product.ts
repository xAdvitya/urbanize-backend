import {
  booleanArg,
  extendType,
  floatArg,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
// import { NexusGenObjects } from '../../nexus-typegen';
import { Product } from '../entities/Product';
import { context } from 'src/types/context';

export const ProductType = objectType({
  name: 'product',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('name'),
      t.nonNull.string('description'),
      t.nonNull.boolean('available');
    t.nonNull.float('price');
  },
});

// let products: NexusGenObjects['product'][] = [
//   {
//     id: 1,
//     name: 'earphone',
//     description: 'new earphones',
//     available: true,
//     price: 4000,
//   },
//   {
//     id: 2,
//     name: 'phone',
//     description: 'new phone',
//     available: true,
//     price: 90000,
//   },
// ];

export const productQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'product',
      resolve(_parent, _args, _context: context, _info): Promise<Product[]> {
        return Product.find();
        // const { conn } = context;
        // return conn.query('select * from Product');
      },
    });
  },
});

export const createProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'product',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        available: nonNull(booleanArg()),
        price: nonNull(floatArg()),
      },
      resolve(_parent, _args, _context, _info): Promise<Product> {
        const { name, description, available, price } = _args;
        return Product.create({ name, available, price, description }).save();
      },
    });
  },
});
