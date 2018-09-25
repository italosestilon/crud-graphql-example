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
import AlbumType from './AlbumType';

const SongType = GraphQLObjectType({
	name: "Album",

	field: () => ({
		title		: {type: new GraphQLNonNull(GraphQLString)},
		release_date: {type: new GraphQLNonNull(GraphQLString)},
		album		: [{type: new GraphQLNonNull(AlbumType)}],
		artists		: [{type: new GraphQLList(ArtistType)}]
	})
	
});

export default AlbumType;