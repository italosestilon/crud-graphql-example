import AlbumType from "../types/album";
import Album from "../models/album";

import { GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";

const queries = {
  albums: {
    type: new GraphQLList(AlbumType),
    resolve: async () => {
      return Album.find({});
    }
  },

  album: {
    type: AlbumType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (obj, args, { loaders }) => {
      return loaders.albumLoader.load(args.id);
    }
  }
};

export default queries;
