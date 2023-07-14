import { DataSource } from 'typeorm';

export type context = {
  conn: DataSource;
};
