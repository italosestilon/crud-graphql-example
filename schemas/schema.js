import {GraphQLSchema} from 'graphql';

import ArtistType from '../types/artist';
import Artist from '../models/artist';

import QueryType from '../queries/index';
import MutationType from '../mutations/index';

export const schema = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType
});