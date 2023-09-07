import { Product } from '../entities/Product';
import { AuthPayload } from 'src/types/context';
import { User } from '../entities/User';
import { extendType, objectType } from 'nexus';
import { Order } from '../entities/Order';

export const OrderType = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('status');
  },
});

export const OrderQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('orderData', {
      type: 'Order',
      resolve(_parent, _args, context: AuthPayload, _info): Promise<Order[]> {
        const { userId } = context;
        if (!userId) {
          throw new Error("can't fetch order without logging in");
        }

        const orders = Order.find({ where: { creatorId: userId } });

        return orders;
      },
    });
  },
});
