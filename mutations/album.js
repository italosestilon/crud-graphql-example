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

    resolve: async (obj, args) => {
      const album = new Album(args);

      const promise = album.save()

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

    resolve: async (obj, args, { loaders }) => {
      try {
        const album = await Album.findByIdAndUpdate(args.id, args, {
          new: true
        });

        loaders.albumLoader.clear(args.id);

        return album;
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

    resolve: async (obj, args, { loaders }) => {
      try {
        const album = await Album.findByIdAndDelete(args.id);

        loaders.albumLoader.clear(args.id);

        await Artist.updateMany(
          { _id: { $in: album.artists } },
          { $pull: { albums: album.id } }
        );

        for (const i in album.artists) {
          loaders.artistLoader.clear(album.artists[i].id);
        }

        return album;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default mutations;
