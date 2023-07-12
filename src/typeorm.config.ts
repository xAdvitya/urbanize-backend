import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
	type: 'postgres',
	url: process.env.POSTGRES_CONNECTION_STRING,
});
