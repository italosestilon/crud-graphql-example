import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
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
      resolve: async (artist, args, { loaders }) => {
        return loaders.albumLoader.loadMany(artist.albums);
      }
    }
  })
});

export default ArtistType;
