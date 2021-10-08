import express from 'express';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import {
	notFoundHandler,
	badRequestHandler,
	genericErrorHandler,
} from './errorHandlers.js';
import products from './services/products/index.js'

const server = express();
const port = 3001;

/////////////middlewares
server.use(cors());
server.use(express.json());
server.use('/products',products)
////Routes comes here

// ************************** ERROR HANDLERS ***************************

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_CONNECTION); ////mongodb+srv://manish:mani@cluster0.gycza.mongodb.net/test

mongoose.connection.on('connected', () => {
	console.log('Successfully connected to Mongo!');
	server.listen(port, () => {
		console.table(listEndpoints(server));
		console.log(`Server running on port ${port}`);
	});
});

mongoose.connection.on('error', (err) => {
	console.log(err);
});
