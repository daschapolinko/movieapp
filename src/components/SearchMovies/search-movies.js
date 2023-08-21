import React, { Component } from 'react';

import MovieList from '../MovieList';
import SearchBar from '../SearchBar';
import MovieService from '../../services/movie-service';

export default class SearchMovies extends Component {
  movieService = new MovieService();

  state = {
    status: 'done',
    errorMessage: '',
    movies: [],
    total: null,
    current: 1,
    query: '',
  };

  onMoviesLoaded = (result) => {
    const { movies, total } = result;
    this.setState({ movies, total, status: 'done' });
  };

  onError = (e) => {
    this.setState({
      status: 'error',
      errorMessage: e,
    });
    alert(e);
  };

  fetchMovies = (query, page = 1) => {
    const { sesId } = this.props;
    this.setState({ current: page, query, status: 'loading' });
    if (query) {
      this.movieService
        .searchMovies(sesId, query, page)
        .then(this.onMoviesLoaded)
        .catch((e) => this.onError(e));
    } else {
      this.setState({ status: 'loading' });
    }
  };

  rateMovie = (movieId, rate) => {
    const { sesId } = this.props;
    this.movieService.rateMovie(sesId, movieId, rate);
  };

  onChange = (page) => {
    const { query } = this.state;
    this.fetchMovies(query, page);
  };

  render() {
    const { movies, status, errorMessage, total, current } = this.state;
    return (
      <>
        <SearchBar onSearch={this.fetchMovies} />
        <MovieList
          movies={movies}
          status={status}
          errorMessage={errorMessage}
          current={current}
          total={total}
          onChange={this.onChange}
          rateMovie={this.rateMovie}
        />
      </>
    );
  }
}
