import artistMutations from './artist';
import albumMutations from './album';

import {GraphQLObjectType} from 'graphql';

const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...artistMutations,
		...albumMutations,
	})
});

export default MutationType;