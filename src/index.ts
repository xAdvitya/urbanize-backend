import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import dotenv from 'dotenv';
import typeormConfig from './typeorm.config';
import { context } from './types/context';
import { User } from './entities/User';
import { Context } from 'nexus-plugin-prisma/dist/utils';
import { auth } from './middlewares/auth';

dotenv.config();

const boot = async () => {
  const conn = await typeormConfig.initialize();

  // const result = await conn
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values({
  //     username: 'Advitya',
  //     email: 'advitya@gmail.com',
  //     password: 'hashedPassword',
  //   })
  //   .returning('*')
  //   .execute();

  // console.log(result);

  const server = new ApolloServer({
    schema,
    context: ({ req }): context => {
      const token = req?.headers?.authorization
        ? auth(req.headers.authorization)
        : null;
      return { conn, userId: token?.userId };
    },
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`Server ready at ${url}`);
};

boot();
