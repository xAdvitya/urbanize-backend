import { verifyToken, AuthTokenPayload } from '../auth';

export const authMiddleware =
  (resolve: any) => async (parent: any, args: any, context: any, info: any) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) {
      throw new Error('Authentication header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Invalid token');
    }

    try {
      const payload = verifyToken(token);
      context.payload = payload;
    } catch (error) {
      throw new Error('Invalid token');
    }

    return resolve(parent, args, context, info);
  };
