export const typeDefs = `
  scalar DateTime
  scalar Upload

  type Error {
    status: String
    code: Int
    developerMessage: String
    userMessage: String
  }

  type Command {
    id: ID
    status: String
    modifyFlag: Int
    statusCode: Int
    message: String
  }

  type CommandPayload {
    command: Command
    error: Error
  }


  type Movie {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    tagIds: [String!]
    movieUrl: String!
    coverUrl: String!
    likeCount: Int!
    commentCount: Int!
    viewCount: Int!
    userAvatar: String!
    userName: String!
    createdAt: String!
    updatedAt: String
  }

  type MoviesPayLoad {
    movies: [Movie]
    hasNext: Boolean
    totalCount: Int
    error: Error
  }

  type NotificationPayLoad {
    id: ID!
  }

  type Query {
    allMovies(word: String!, limit: Int!, skip: Int!): MoviesPayLoad!
    allRelatedMovies(userId: ID!, limit: Int!, skip: Int!): MoviesPayLoad!
    allMovieComment(movieId: ID!, userId: ID!, limit: Int!, skip: Int!): MoviesPayLoad!
    movieById(movieId: ID!): MoviesPayLoad!
  }

  type Mutation {
    createMovie(title: String!, description: String!, tagIds: [String]!, movieUrl: String!): CommandPayload!
    editMovie(movieId: ID!, title: String!, description: String!, tagIds: [String]!, movieUrl: String!): CommandPayload!
    createMovieComment(movieId: ID!, userId: ID!, commentText: String!): CommandPayload!
    editMovieComment(movieId: ID!, userId: ID!, commentText: String!): CommandPayload!
  }

  type Subscription {
    notifications(userId: ID!): NotificationPayLoad!
  }
`
