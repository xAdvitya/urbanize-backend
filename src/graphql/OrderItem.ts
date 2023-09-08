import { extendType, objectType } from 'nexus';
import { OrderItem } from '../entities/OrderItem';
import { Order } from '../entities/Order';
import { AuthPayload } from 'src/types/context';

export const OrderitemType = objectType({
  name: 'OrderItem',
  definition(t) {
    t.int('id'), t.int('quantity'), t.float('unit_price'), t.float('subtotal');
    t.int('productId');
  },
});

export const OrderItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.list.field('fetchOrderItems', {
      type: 'OrderItem',
      async resolve(_parent, _args, context: AuthPayload, _info) {
        const { userId } = context;
        if (!userId) {
          throw new Error("can't order product without logging in");
        }

        const orders = await Order.find({ where: { creatorId: userId } });

        if (!orders) {
          throw new Error(`no Order found.`);
        }

        let orderItems = [];
        for (const order of orders) {
          const orderItem = await OrderItem.find({
            where: { orderId: order.id },
          });

          orderItems.push(orderItem);
        }

        return orderItems;
      },
    });
  },
});
