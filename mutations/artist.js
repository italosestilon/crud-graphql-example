import ArtistType from '../types/artist';
import Artist from '../models/artist';

import {
	GraphQLString, 
	GraphQLNonNull,
	GraphQLList
} from 'graphql';

const mutations = {
	createArtist: {
		type: ArtistType,
		args: {
			name: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},

		resolve: async (root, input) => {
			const artist = new Artist(input);

			try{
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
			albuns: {
				type: new GraphQLList(GraphQLString)
			}
		},

		resolve: async (root, input) => {
			try{
				return await Artist.findByIdAndUpdate(input.id, input, {new: true});
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

		resolve: async (root, input) => {
			try{
				return await Artist.findByIdAndRemove(input.id);
			} catch (error) {
				throw Error(error);
			}
		}
	}
}

export default mutations;