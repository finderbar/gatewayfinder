import { writeGraphqlMutation } from './write-graphql';
import { readGraphqlQuery } from './read-graphql';
import { wsGraphqlSubscription } from './ws-graphql';

export const resolvers = { Query: readGraphqlQuery, Mutation: writeGraphqlMutation, Subscription: wsGraphqlSubscription }
