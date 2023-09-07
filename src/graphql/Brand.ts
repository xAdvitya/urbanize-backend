import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { AuthPayload } from 'src/types/context';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { Brand } from '../entities/Brand';

export const BrandType = objectType({
  name: 'Brand',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
  },
});

export const BrandQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('fetchProductByBrand', {
      type: 'Product',
      args: {
        brandId: nonNull(intArg()),
      },
      resolve(_parent, args, _context: AuthPayload, _info): Promise<Product[]> {
        const { brandId } = args;
        return Product.find({ where: { brandId: brandId } });
      },
    });
  },
});

export const CreateBrandMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createBrand', {
      type: 'Brand',
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_parent, args, context: AuthPayload, _info) {
        const { name } = args;
        const { userId, role } = context;

        if (!userId || role == 'USER') {
          throw new Error("can't create brand without ADMIN previlage");
        }

        return Brand.create({
          name,
        }).save();
      },
    });
  },
});
