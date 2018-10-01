import {
  GraphQLID,
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
import Album from "../models/album";

const ArtistType = new GraphQLObjectType({
  name: "Artist",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: async (artist, _args, { loaders }) => {
        return await loaders.albumLoader.load(artist.albums);
      }
    }
  })
});

export default ArtistType;
