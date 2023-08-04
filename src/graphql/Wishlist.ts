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

export const addToWishlistMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addToWishlist', {
      type: 'Wishlist',
      args: {
        productId: nonNull(intArg()),
      },
      resolve: async (_parent, args, context): Promise<Wishlist> => {
        const { productId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't add product to wishlist without logging in");
        }

        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
          throw new Error('Product not found');
        }

        const wishlistItem = Wishlist.create({
          product,
          creator: { id: userId },
        });
        return wishlistItem.save();
      },
    });
  },
});

export const removeFromWishlist = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('removeFromWishlist', {
      type: 'Boolean',
      args: {
        productId: nonNull(intArg()),
      },
      resolve(_parent, args, context, _info) {
        const { productId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error(
            "Can't remove product from wishlist without logging in"
          );
        }
        return deleteProductFromWishlist(userId, productId);
      },
    });
  },
});

async function deleteProductFromWishlist(
  userId: number,
  
  productId: number
): Promise<boolean> {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: { creator: { id: userId }, product: { id: productId } },
    });

    if (!wishlistItem) {
      return false;
    }

    await wishlistItem.remove();
    return true;
  } catch (error) {
    throw new Error('Error removing product from wishlist');
  }
}
