import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { AuthPayload } from 'src/types/context';
import { Review } from '../entities/Review';

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
    t.nonNull.list.nonNull.field('fetchReview', {
      type: 'Review',
      args: {
        productId: nonNull(intArg()),
      },
      resolve(_parent, args, _context, _info): Promise<Review[]> {
        const { productId } = args;
        return Review.find({
          where: { product: { id: productId } },
          relations: ['product'],
        });
      },
    });
  },
});

export const fetchUserReviewQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('fetchUserReviw', {
      type: 'Review',
      args: {
        userId: intArg(),
      },
      async resolve(_parent, args, context: AuthPayload, _info) {
        const { userId } = context;
        let userReviews;
        if (!args.userId) {
          if (!userId) {
            throw new Error("Can't add product to wishlist without logging in");
          }
          userReviews = await Review.find({ where: { creatorId: userId } });
        } else {
          userReviews = await Review.find({
            where: { creatorId: args.userId },
          });
        }

        return userReviews;
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
      resolve(_parent, args, context: AuthPayload, _info): Promise<Review> {
        const { productId, title, rating, review_text } = args;
        const { userId, role } = context;

        if (!userId) {
          throw new Error("Can't add product to wishlist without logging in");
        }

        if (role == 'ADMIN') {
          throw new Error("can't add reviews as an Admin");
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

export const deleteReviewMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteReview', {
      type: 'Review',
      args: {
        reviewId: nonNull(intArg()),
      },
      async resolve(
        _parent,
        args,
        context: AuthPayload
      ): Promise<Review | null> {
        const { reviewId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error(
            "Can't remove product from wishlist without logging in"
          );
        }

        const reviewItem = await Review.findOne({ where: { id: reviewId } });

        if (!reviewItem) {
          return null;
        }

        await reviewItem.remove();
        return reviewItem;
      },
    });
  },
});
