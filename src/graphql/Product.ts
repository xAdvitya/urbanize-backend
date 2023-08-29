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
import { Category } from '../entities/Category';
import { Brand } from '../entities/Brand';
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

    t.field('ImageDetail', {
      type: 'ProductImage',
      resolve(parent, _args, _context, _info): Promise<ProductImage[] | null> {
        return ProductImage.find({
          where: { product: { id: 1 } },
          relations: ['product'],
        });
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
        productId: nonNull(intArg()),
      },
      resolve(_parent, args, _context: AuthPayload, _info): Promise<Product[]> {
        const { productId } = args;
        return Product.find({ where: { id: productId } });
        // const { conn } = context;
        // return conn.query('select * from Product');
      },
    });
  },
});

export const productBrandQuery = extendType({
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

export const productCategoryQuery = extendType({
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
      resolve(_parent, args, context, _info): Promise<Product> {
        const { name, description, available, price, categoryId, brandId } =
          args;
        const { userId } = context;

        if (!userId) {
          throw new Error("can't create product without logging in");
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
