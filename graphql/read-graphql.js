import {
  getAllMovieByUserDefinedLimit,
  getAllRelatedMovieByUserDefinedLimit,
  getAllMovieCommentByUserDefinedLimit,
  getMovieById
} from '../services/movies';

export const readGraphqlQuery = {
  allMovies: (_, args, ctx) => getAllMovieByUserDefinedLimit(_, args, ctx),
  allRelatedMovies: (_, args, ctx) => getAllRelatedMovieByUserDefinedLimit(_, args, ctx),
  allMovieComment: (_, args, ctx) => getAllMovieCommentByUserDefinedLimit(_, args, ctx),
  movieById: (_, args, ctx) => getMovieById(_, args, ctx),
}
