import ArtistType from '../types/artist';
import Artist from '../models/artist';

import {
	GraphQLString, 
	GraphQLNonNull
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
			const newArtist = await artist.save();

			if(!newArtist) {
				throw new Error('Error');
			}

			return newArtist;
		}
	}
}

export default mutations;