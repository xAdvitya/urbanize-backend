import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import dotenv from 'dotenv';
import typeormConfig from './typeorm.config';
import { context } from './types/context';
import { User } from './entities/User';

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
    context: (): context => ({ conn }),
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`Server ready at ${url}`);
};

boot();
