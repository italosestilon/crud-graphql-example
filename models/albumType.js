import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

import ArtistType from './artistType';

const AlbumType = new GraphQLObjectType({
	name: 'Album',
	fields: () => ({
		title		: {type: new GraphQLNonNull(GraphQLString)},
		release_date: {type: new GraphQLNonNull(GraphQLString)},
		songs		: {type: new GraphQLList(GraphQLString)},
		artists		: {type: new GraphQLList(ArtistType)}
	})
	
});

export default AlbumType;