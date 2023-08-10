/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';

import MovieService from '../../services/movie-service';

const movieService = new MovieService();

const genres = await movieService
  .getGenres()
  .then((res) => res.genres)
  .catch((e) => console.error(e));

export const GenresContext = createContext(await genres);
