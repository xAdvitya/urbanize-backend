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
import { AuthPayload } from 'src/types/context';
import { User } from '../entities/User';
import { ILike } from 'typeorm';
import { ProductImage } from '../entities/ProductImage';

export const ProductType = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.boolean('available');
    t.nonNull.float('price');
    t.nonNull.int('creatorId');
    t.nonNull.int('categoryId');
    t.nonNull.int('brandId');

    t.nonNull.list.nonNull.field('ImageDetail', {
      type: 'ProductImage',
      resolve(parent, _args, _context, _info): Promise<ProductImage[] | null> {
        return ProductImage.find({ where: { productId: parent.id } });
      },
    });

    t.field('createdBy', {
      type: 'User',
      resolve(
        parent,
        _args,
        _context: AuthPayload,
        _info
      ): Promise<User | null> {
        return User.findOne({ where: { id: parent.creatorId } });
      },
    });
  },
});

export const productQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('fetchProduct', {
      type: 'Product',
      args: {
        productId: intArg(),
      },
      resolve(_parent, args, _context: AuthPayload, _info): Promise<Product[]> {
        const { productId } = args;

        if (productId === null) {
          return Product.find();
        }
        return Product.find({ where: { id: productId } });
        // const { conn } = context;
        // return conn.query('select * from Product');
      },
    });
  },
});

export const createProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        available: nonNull(booleanArg()),
        price: nonNull(floatArg()),
        categoryId: nonNull(intArg()),
        brandId: nonNull(intArg()),
      },
      resolve(_parent, args, context: AuthPayload, _info): Promise<Product> {
        const { name, description, available, price, categoryId, brandId } =
          args;
        const { userId, role } = context;

        if (!userId || role == 'USER') {
          throw new Error("can't create brand without ADMIN previlage");
        }

        return Product.create({
          name,
          available,
          price,
          description,
          creatorId: userId,
          categoryId,
          brandId,
        }).save();
      },
    });
  },
});

export const searchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
      args: {
        searchKeyword: stringArg(),
      },
      resolve(_parent, args, _context, _info): Promise<Product[]> {
        const { searchKeyword } = args;
        if (searchKeyword) {
          return Product.find({
            where: [
              { name: ILike(`%${searchKeyword}%`) },
              { description: ILike(`%${searchKeyword}%`) },
            ],
          });
        }
        return Product.find();
      },
    });
  },
});
