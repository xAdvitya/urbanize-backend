import { extendType, intArg, nonNull, objectType } from 'nexus';
import { User } from '../entities/User';
import { context } from 'src/types/context';

export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('username'),
      t.nonNull.string('first_name'),
      t.nonNull.string('last_name'),
      t.string('phone_number'),
      t.nonNull.string('email');
    t.string('address');
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('userData', {
      type: 'User',
      args: {
        userId: nonNull(intArg()),
      },
      resolve(_parent, args, _context: context, _info): Promise<User> {
        const { userId } = args;
        return User.findOne({ where: { id: userId } });
      },
    });
  },
});
