import { extendType, intArg, nonNull, objectType } from 'nexus';
import { AuthPayload } from 'src/types/context';
import { Cart } from '../entities/Cart';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

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
    t.nonNull.list.field('fetchCart', {
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

export const removeFromCartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('removeFromCart', {
      type: 'Cart',
      args: {
        productId: nonNull(intArg()),
      },
      async resolve(
        _parent,
        args,
        context: AuthPayload,
        _info
      ): Promise<Cart | null> {
        const { productId } = args;
        const { userId } = context;
        if (!userId) {
          throw new Error(
            "Can't remove product from wishlist without logging in"
          );
        }

        const cartItem = await Cart.findOne({
          where: {
            productId: productId,
          },
        });

        await cartItem.remove();
        return cartItem;
      },
    });
  },
});

const BuyCartResponse = objectType({
  name: 'BuyCartResponse',
  definition(t) {
    t.boolean('success');
    t.string('message');
  },
});

export const buyCartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('buyCart', {
      type: BuyCartResponse,
      resolve: async (_parent, _args, context: AuthPayload, _info) => {
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't buy cart without logging in");
        }

        const cartItems = await Cart.find({ where: { creatorId: userId } });

        if (cartItems.length === 0) {
          throw new Error('Cart is empty.');
        }

        const order = new Order();
        order.creatorId = userId;

        order.status = 'Processing';
        order.createdAt = new Date();

        const orderItems: OrderItem[] = [];

        for (const cartItem of cartItems) {
          const product = await Product.findOne({
            where: { id: cartItem.productId },
          });

          const orderItem = new OrderItem();
          orderItem.productId = cartItem.productId;
          orderItem.quantity = 1;
          orderItems.push(orderItem);
          await orderItem.save();
        }

        order.orderItem = orderItems;

        const totalAmount = orderItems.reduce(
          (total, item) => total + item.unit_price * item.quantity,
          0
        );

        order.creatorId = userId;

        order.total = totalAmount;

        await order.save();

        await Cart.remove(cartItems);

        return {
          success: true,
          message: 'Cart purchased successfully.',
        };
      },
    });
  },
});
