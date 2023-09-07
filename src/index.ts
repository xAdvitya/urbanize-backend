import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import dotenv from 'dotenv';
import typeormConfig from './typeorm.config';
import { verifyToken } from './auth';
import { CustomContext } from './types/context';

dotenv.config();

const boot = async () => {
  const conn = await typeormConfig.initialize();

  try {
    await conn.query('SELECT 1');
    console.log('🚀 Database connection established');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
    return;
  }

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: CustomContext = { req, conn };
      const authorizationHeader = req.headers.authorization;
      // try {
      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        if (token) {
          const payload = verifyToken(token);
          // console.log(payload);
          context.userId = payload.userId;
          context.role = payload.role;
        }
      }
      // }
      // catch (error) {
      //   console.error(error);
      // }
      // console.log(context);
      return context;
    },
  });

  const { url } = await server.listen(process.env.PORT);
  console.log('🚀 Server ready at', url);
};

boot();
