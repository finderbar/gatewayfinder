import { withFilter } from 'graphql-subscriptions';

export const resolvers = {
  Query: {
    movies: (_, args, ctx) => getAllMovieByUserDefinedLimit(_, args, ctx),
  },

  Mutation: {
    saveMovie: (_, args, ctx) => createMovie(_, args, ctx),
  },

  Subscription: {
    appNotificationSub: {}
  }
}