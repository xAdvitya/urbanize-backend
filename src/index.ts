import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import dotenv from 'dotenv';
import typeormConfig from './typeorm.config';

dotenv.config();

const boot = async () => {
  await typeormConfig.initialize();
  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`Server ready at ${url}`);
};

boot();
