import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import connectDB from './configs/db';

import { hgqlInit } from './helpers';
import routes from './routes';
import { errorHandler, notFoundHandler } from './libs';
import pkg from './package.json' assert { type: 'json' };
import configStore, { IConfigKeys } from './configs';
import schema from './schema/schema';
import Resolvers from './resolvers';

export const app: express.Application = express();

console.log('🚀', '@' + pkg.author.name + '/' + pkg.name, 'v' + pkg.version);

const isDev: boolean = process.env.NODE_ENV == 'production';
console.log(isDev ? '🚀 Production Mode' : '🚀 Development Mode');
const configs = new configStore(isDev);
const configKeys: IConfigKeys = (await configs.getConfigStore()) as IConfigKeys;

// hgqlInit();

// app.use(cors());
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// app.use('/health', (req, res) => {
// 	return res.status(200).json({
// 		app: pkg.name,
// 		request_ip: req.ip,
// 		uptime: process.uptime(),
// 		hrtime: process.hrtime(),
// 	});
// });

// console.log('☄', 'Base Route', '/');
// app.use('/', routes);

// app.use(notFoundHandler);
// app.use(errorHandler);

// app.listen(configKeys.PORT, async () => {
// 	console.log(`\nServer running on port ${configKeys.PORT}`);
// });

// export { configKeys };

async function startApolloServer(schema: any, resolvers: any) {
	const app = express();
	connectDB(); 
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs: schema,
		resolvers,
		//tell Express to attach GraphQL functionality to the server
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	}) as any;
	await server.start(); //start the GraphQL server.
	server.applyMiddleware({ app });
	await new Promise<void>(
		resolve => httpServer.listen({ port: `${configKeys.PORT}` }, resolve) //run the server on port 4000
	);
	console.log(
		`Server ready at http://localhost:${configKeys.PORT}${server.graphqlPath}`
	);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(schema, Resolvers);
