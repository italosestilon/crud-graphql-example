import ArtistType from "../types/artist";
import Artist from "../models/artist";

import { GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";

const queries = {
  artists: {
    type: new GraphQLList(ArtistType),
    resolve: async () => {
      return Artist.find({});
    }
  },

  artist: {
    type: ArtistType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (obj, args, { loaders }) => {
      return loaders.artistLoader.load(args.id);
    }
  }
};

export default queries;
