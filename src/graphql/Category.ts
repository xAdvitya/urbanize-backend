import { extendType, intArg, nonNull, objectType } from 'nexus';
import { AuthPayload } from 'src/types/context';
import { Product } from '../entities/Product';

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
      resolve(_parent, args, context: AuthPayload, _info): Promise<Product[]> {
        const { categoryId } = args;
        const { userId, role } = context;

        if (!userId || role == 'USER') {
          throw new Error("can't create category without ADMIN previlage");
        }

        return Product.find({ where: { categoryId: categoryId } });
      },
    });
  },
});
