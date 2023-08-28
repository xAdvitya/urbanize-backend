import { Product } from '../entities/Product';
import { context } from 'src/types/context';
import { User } from '../entities/User';
import { extendType, objectType } from 'nexus';

export const OrderType = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.int('id'), t.nonNull.float('total'), t.nonNull.int('creatorId');
  },
});

export const OrderQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('orderData', {
      type: 'Order',
      resolve(_parent, _args, _context, _info) {},
    });
  },
});
