import { objectType } from 'nexus';

export const ImageType = objectType({
  name: 'ProductImage',
  definition(t) {
    {
      t.int('id');
      t.string('key');
      t.int('productId');
    }
  },
});
