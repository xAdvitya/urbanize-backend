import { Request } from 'express';
import { DataSource } from 'typeorm';

export interface AuthPayload {
  userId: number;
  role: string;
}

export interface CustomContext {
  req?: Request;
  payload?: AuthPayload;
  userId?: number;
  role?: string;
  conn: DataSource;
}
