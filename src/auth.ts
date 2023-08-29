import * as jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  userId: number;
  role: string;
}

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as jwt.Secret
  ) as AuthTokenPayload;
};
