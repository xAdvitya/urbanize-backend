import { extendType, intArg, nonNull, objectType } from 'nexus';
import { AuthPayload } from 'src/types/context';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';

export const CategoryType = objectType({
  name: 'Category',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
  },
});

export const CategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('fetchProductByCategory', {
      type: 'Product',
      args: {
        categoryId: nonNull(intArg()),
      },
      resolve(_parent, args, _context: AuthPayload, _info): Promise<Product[]> {
        const { categoryId } = args;
        return Product.find({ where: { categoryId: categoryId } });
      },
    });
  },
});
