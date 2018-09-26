import artistQueries from './artist';

import {GraphQLObjectType} from 'graphql';

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...artistQueries,
	})
});

export default QueryType;