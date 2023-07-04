import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
	const uri =
		process.env.MONGO_URI ||
		'mongodb+srv://xAd:YoErEBTsVGHmSYFW@clusterx.uzlo6.mongodb.net/?retryWrites=true&w=majority';

	try {
		// Connect to the MongoDB database
		await mongoose.connect(uri);

		console.log('Connected to the database!');
	} catch (error) {
		console.log('Error connecting to the database:', error);
	}
}

export default connectDB;
