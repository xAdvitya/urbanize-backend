import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
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

export const addReviewMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addReview', {
      type: 'Review',
      args: {
        productId: nonNull(intArg()),
        title: nonNull(stringArg()),
        rating: nonNull(intArg()),
        review_text: nonNull(stringArg()),
      },
      resolve(_parent, args, context, _info): Promise<Review> {
        const { productId, title, rating, review_text } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't add product to wishlist without logging in");
        }

        const review = Review.create({
          title,
          rating,
          review_text,
          product: { id: productId },
        });

        return review.save();
      },
    });
  },
});
