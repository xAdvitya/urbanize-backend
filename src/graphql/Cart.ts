import { extendType, intArg, nonNull, objectType } from 'nexus';
import { AuthPayload } from 'src/types/context';
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

export const addToCartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addToCart', {
      type: 'Cart',
      args: {
        productId: nonNull(intArg()),
        creatorId: nonNull(intArg()),
      },
      resolve(_parent, args, context: AuthPayload, _info): Promise<Cart> {
        const { productId, creatorId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("can't add to cart without logging in");
        }

        return Cart.create({
          productId,
          creatorId,
        }).save();
      },
    });
  },
});
