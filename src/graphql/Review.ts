import {
  booleanArg,
  extendType,
  floatArg,
  intArg,
  nonNull,
  objectType,
  stringArg,
  scalarType,
} from 'nexus';
import { Product } from '../entities/Product';
import { context } from 'src/types/context';
import { Review } from '../entities/Review';
import { Wishlist } from 'src/entities/Wishlist';

export const ReviewType = objectType({
  name: 'Review',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.int('rating');
    t.nonNull.string('review_text');
    t.nonNull.string('createdAt');
  },
});

export const ReviewQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('Review', {
      type: 'Review',
      args: {
        productId: nonNull(intArg()),
      },
      resolve(_parent, args, context: context, _info): Promise<Review[]> {
        const { userId } = context;
        const { productId } = args;
        if (!userId) {
          throw new Error("can't create product without logging in");
        }

        return Review.find({
          where: { product: { id: productId } },
          relations: ['product'],
        });
      },
    });
  },
});
