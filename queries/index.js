import artistQueries from './artist';
import albumQueries from './album';

import {GraphQLObjectType} from 'graphql';

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...artistQueries,
		...albumQueries,
	})
});

export default QueryType;