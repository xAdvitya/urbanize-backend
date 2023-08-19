import { objectType } from 'nexus';

export const BrandType = objectType({
  name: 'Brand',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
  },
});
