import ArtistType from "../types/artist";
import Artist from "../models/artist";
import Album from "../models/album";

import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";

const mutations = {
  createArtist: {
    type: ArtistType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },

    resolve: async (obj, args) => {
      const artist = new Artist(args);
      try {
        return await artist.save();
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  updateArtist: {
    type: ArtistType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      albums: {
        type: new GraphQLList(GraphQLString)
      }
    },

    resolve: async (obj, args, { loaders }) => {
      try {
        const artist = await Artist.findByIdAndUpdate(args.id, args, {
          new: true
        });

        loaders.artistLoader.clear(args.id);
        //loaders.artistLoader.prime(args.id, artist);

        return artist;
      } catch (error) {
        throw Error(error);
      }
    }
  },

  deleteArtist: {
    type: ArtistType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (obj, args, { loaders }) => {
      try {
        const artist = await Artist.findByIdAndDelete(args.id);

        loaders.artistLoader.clear(args.id);

        return artist;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default mutations;
