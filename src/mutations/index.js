import artistMutations from "./artist";
import albumMutations from "./album";
import userMutations from "./user";

import { GraphQLObjectType } from "graphql";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...artistMutations,
    ...albumMutations,
    ...userMutations
  })
});

export default MutationType;
