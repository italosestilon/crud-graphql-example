import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList
} from "graphql";

import AlbumType from "./album";

const ArtistType = new GraphQLObjectType({
  name: "Artist",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    albums: { type: new GraphQLList(AlbumType) }
  })
});

export default ArtistType;
