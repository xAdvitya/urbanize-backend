import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	phone: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Not Started', 'In Progress', 'Completed'],
	},
	clientId: {
		type: Schema.Types.ObjectId,
		ref:'Client'
	},
});

export default model('Project', ProjectSchema);
