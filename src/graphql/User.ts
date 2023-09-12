import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { User } from '../entities/User';
import { AuthPayload } from 'src/types/context';
import { enumType } from 'nexus';

export const UserRole = enumType({
  name: 'UserRole',
  members: ['USER', 'ADMIN'],
});

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
    t.nonNull.field('role', { type: 'UserRole' });
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
      resolve(_parent, args, _context: AuthPayload, _info): Promise<User> {
        const { userId } = args;
        return User.findOne({ where: { id: userId } });
      },
    });
  },
});

export const userUpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUserData', {
      type: 'User',
      args: {
        first_name: nonNull(stringArg()),
        last_name: nonNull(stringArg()),
        phone_number: stringArg(),
        address: stringArg(),
      },

      resolve: async (_parent, args, context: AuthPayload, _info) => {
        const { userId } = context;
        const { first_name, last_name, phone_number, address } = args;

        if (!userId) {
          throw new Error('You must be logged in to update your data.');
        }

        const userToUpdate = await User.findOne({ where: { id: userId } });

        if (!userToUpdate) {
          throw new Error('User not found.');
        }

        const phoneNumberRegex = /^\d{10}$/;

        if (!phoneNumberRegex.test(phone_number)) {
          throw new Error(
            'Invalid phone number. It should be a 10-digit number.'
          );
        }

        userToUpdate.first_name = first_name;
        userToUpdate.last_name = last_name;
        userToUpdate.phone_number = phone_number;
        userToUpdate.address = address;

        await userToUpdate.save();

        return userToUpdate;
      },
    });
  },
});
