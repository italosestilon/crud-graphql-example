import AlbumType from "../types/album";
import Album from "../models/album";

import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";

const mutations = {
  createAlbum: {
    type: AlbumType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      release_date: { type: new GraphQLNonNull(GraphQLString) },
      songs: { type: new GraphQLList(GraphQLString) },
      artists: { type: new GraphQLList(GraphQLString) }
    },

    resolve: async (root, input) => {
      const album = new Album(input);

      try {
        return await album.save();
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  updateAlbum: {
    type: AlbumType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      release_date: { type: GraphQLString },
      songs: { type: GraphQLString },
      artists: { type: GraphQLString }
    },

    resolve: async (root, input) => {
      try {
        return await Album.findByIdAndUpdate(input.id, input, { new: true });
      } catch (error) {
        throw Error(error);
      }
    }
  },

  deleteAlbum: {
    type: AlbumType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },

    resolve: async (root, input) => {
      try {
        return await Album.findByIdAndRemove(input.id);
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default mutations;
