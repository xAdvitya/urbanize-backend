import { objectType } from 'nexus';

export const ImageType = objectType({
  name: 'ProductImage',
  definition(t) {
    {
      t.nonNull.int('id');
      t.nonNull.string('key');
      t.nonNull.int('productId');
    }
  },
});
