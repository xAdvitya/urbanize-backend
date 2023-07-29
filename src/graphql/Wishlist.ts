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
import { Wishlist } from '../entities/Wishlist';

export const WishlistType = objectType({
  name: 'Wishlist',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('product', { type: 'Product' });
  },
});

export const WishlistQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('Wishlist', {
      type: 'Wishlist',
      resolve(_parent, _args, context: context, _info): Promise<Wishlist[]> {
        const { userId } = context;
        if (!userId) {
          throw new Error("can't create product without logging in");
        }
        return Wishlist.find({
          where: { creator: { id: userId } },
          relations: ['product'],
        });
        // const { conn } = context;
        // return conn.query(
        //   `select * from Wishlist where creator_id='${userId}'`
        // );
      },
    });
  },
});
