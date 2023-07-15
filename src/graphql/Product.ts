import {
  booleanArg,
  extendType,
  floatArg,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Product } from '../entities/Product';
import { context } from 'src/types/context';
import { User } from '../entities/User';

export const ProductType = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('name'),
      t.nonNull.string('description'),
      t.nonNull.boolean('available'),
      t.nonNull.float('price'),
      t.nonNull.int('creatorId'),
      t.field('createdBy', {
        type: 'User',
        resolve(parent, _args, _context: context, _info): Promise<User | null> {
          return User.findOne({ where: { id: parent.creatorId } });
        },
      });
  },
});

export const productQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
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
      type: 'Product',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        available: nonNull(booleanArg()),
        price: nonNull(floatArg()),
      },
      resolve(_parent, args, context, _info): Promise<Product> {
        const { name, description, available, price } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("can't create product without logging in");
        }

        return Product.create({
          name,
          available,
          price,
          description,
          creatorId: userId,
        }).save();
      },
    });
  },
});
