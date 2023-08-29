import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { AuthPayload, CustomContext } from '../types/context'; // Update the import path
import argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

export const AuthType = objectType({
  name: 'AuthType',
  definition(t) {
    t.nonNull.string('token'),
      t.nonNull.field('user', {
        type: 'User',
      });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthType',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: AuthPayload, _info) {
        const { username, password } = args;
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error('User not found');
        }
        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
          throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET as jwt.Secret
        );

        return { token, user };
      },
    });
    t.nonNull.field('register', {
      type: 'AuthType',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: CustomContext, _info) {
        const { username, email, password } = args;
        const hashedPassword = await argon2.hash(password);
        let user;
        let token;
        try {
          const result = await context.conn
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ username, email, password: hashedPassword })
            .returning('*')
            .execute();

          user = result.raw[0];
          token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET as jwt.Secret
          );
        } catch (err) {
          console.log(err);
        }

        return {
          user,
          token,
        };
      },
    });
  },
});
