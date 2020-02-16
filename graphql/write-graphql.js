import {
  createMovie,
  editMovie,
  createMovieComment,
  editMovieComment
} from '../services/movies';

export const writeGraphqlMutation = {
  createMovie: (_, args, ctx) => createMovie(_, args, ctx),
  editMovie: (_, args, ctx) => editMovie(_, args, ctx),
  createMovieComment: (_, args, ctx) => createMovieComment(_, args, ctx),
  editMovieComment: (_, args, ctx) => editMovieComment(_, args, ctx),
}
