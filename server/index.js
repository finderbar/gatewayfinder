import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({ typeDefs, resolvers });