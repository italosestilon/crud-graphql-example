import artistMutations from './artist';

import {GraphQLObjectType} from 'graphql';

const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...artistMutations,
	})
});

export default MutationType;