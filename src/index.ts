import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import dotenv from 'dotenv';
import typeormConfig from './typeorm.config';
import { verifyToken } from './auth';
import { CustomContext } from './types/context';

dotenv.config();

const boot = async () => {
  const conn = await typeormConfig.initialize();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: CustomContext = { req, conn };
      const authorizationHeader = req.headers.authorization;

      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        if (token) {
          const payload = verifyToken(token);
          context.userId = payload.userId;
          context.role = payload.role;
        }
      }

      return context;
    },
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`Server ready at ${url}`);
};

boot();
