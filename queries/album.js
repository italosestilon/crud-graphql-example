import AlbumType from "../types/album";
import Album from "../models/album";

import { GraphQLList } from "graphql";

const queries = {
  albuns: {
    type: new GraphQLList(AlbumType),
    resolve: async () => {
      return await Album.find({}).populate("artists");
    }
  }
};

export default queries;
