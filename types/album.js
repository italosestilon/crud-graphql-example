import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLInt,
	GraphQLEnumType,
	GraphQLFloat,
	GraphQLList,
} from 'graphql';

import ArtistType from './artist';

const AlbumType = new GraphQLObjectType({
	name: 'Album',
	fields: () => ({
		id			: {type: new GraphQLNonNull(GraphQLString)},
		title		: {type: new GraphQLNonNull(GraphQLString)},
		release_date: {type: new GraphQLNonNull(GraphQLString)},
		songs		: {type: new GraphQLList(GraphQLString)},
		artists		: {type: new GraphQLList(ArtistType)}
	})
	
});

export default AlbumType;