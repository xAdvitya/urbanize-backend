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
import { User } from '../entities/User';

export const OrderitemType = objectType({
  name: 'OrderItem',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.int('quantity'),
      t.nonNull.float('unit_price'),
      t.nonNull.float('subtotal');
  },
});
