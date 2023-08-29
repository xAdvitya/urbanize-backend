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
import { Category } from '../entities/Category';
import { Brand } from '../entities/Brand';
import { AuthPayload } from 'src/types/context';
import { User } from '../entities/User';
import { ILike } from 'typeorm';
import { ProductImage } from '../entities/ProductImage';
import { resolve } from 'path';
import { Cart } from '../entities/Cart';

export const CartType = objectType({
  name: 'Cart',
  definition(t) {
    t.int('id');
    t.int('creatorId');
    t.int('productId');
  },
});

export const cartQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('fetchCart', {
      type: 'Cart',
      resolve(_parent, args, context: AuthPayload, _info): Promise<Cart[]> {
        const { userId } = context;

        if (!userId) {
          throw new Error("can't create product without logging in");
        }
        return Cart.find({ where: { creatorId: userId } });
      },
    });
  },
});
