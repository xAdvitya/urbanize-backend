import { gql } from 'apollo-server-express';

const Schema = gql`
	type projects {
		id: ID!
		clientId: String
		name: String
		description: String
	}

	type Query {
		getAllProjects: [projects]
		getProject(id: Int): projects
	}
`;
export default Schema;
