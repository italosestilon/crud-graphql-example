import ArtistType from '../types/artist';
import Artist from '../models/artist';

import {GraphQLList} from 'graphql';

const queries = {
	artists: {
		type: new GraphQLList(ArtistType),
		resolve: async () => {
			return await Artist.find({});
		}
	}
}

export default queries;