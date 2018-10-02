import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList
} from "graphql";

import ArtistType from "./artist";
import Artist from "../models/artist";

const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    release_date: { type: new GraphQLNonNull(GraphQLString) },
    songs: { type: new GraphQLList(GraphQLString) },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve: async (album, args, { loaders }) => {
        return loaders.artistLoader.loadMany(album.artists);
      }
    }
  })
});

export default AlbumType;
