/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

import MovieList from '../MovieList';
import MovieService from '../../services/movie-service';

export default class RatedMovies extends Component {
  movieService = new MovieService();

  state = {
    status: 'done',
    movies: [],
    total: null,
    current: 1,
  };

  componentDidMount() {
    const { sesId } = this.props;
    this.fetchRatedMovies(sesId, 1);
  }

  onMoviesLoaded = (result) => {
    const { movies, total } = result;
    this.setState({ movies, total, status: 'done' });
  };

  onError = (e) => {
    this.setState({
      status: 'error',
    });
    throw new Error(e);
  };

  fetchRatedMovies = (sesId, page = 1) => {
    this.setState({ current: page, status: 'loading' });
    this.movieService
      .getRatedMovies(sesId, page)
      .then(this.onMoviesLoaded)
      .catch((e) => this.onError(e));
  };

  rateMovie = (movieId, rate) => {
    const { sesId } = this.props;
    this.movieService.rateMovie(sesId, movieId, rate);
  };

  onChange = (page) => {
    const { sesId } = this.props;
    this.fetchRatedMovies(sesId, page);
  };

  render() {
    const { movies, status, total, current } = this.state;
    return (
      <MovieList
        movies={movies}
        status={status}
        current={current}
        total={total}
        onChange={this.onChange}
        rateMovie={this.rateMovie}
      />
    );
  }
}
