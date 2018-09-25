import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import ArtistType from '../models/artistType';
import Artist from '../models/artist';

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		artists: {
			type: new GraphQLList(ArtistType),
			resolve: async () => {
				return await Artist.find({});
			}
		}
	})
});

export const schema = new GraphQLSchema({
	query: QueryType
});