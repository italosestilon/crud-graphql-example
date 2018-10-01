import AlbumType from "../types/album";
import Album from "../models/album";
import Artist from "../models/artist";

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
        await album.save();

        await Artist.updateMany(
          { _id: { $in: album.artists } },
          { $push: { albums: album.id } }
        );

        return album;
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
        const album = await Album.findByIdAndDelete(input.id);
        await Artist.updateMany(
          { _id: { $in: album.artists } },
          { $pull: { albums: album.id } }
        );
        return album;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default mutations;
