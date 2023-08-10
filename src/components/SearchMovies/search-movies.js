/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

import MovieList from '../MovieList';
import SearchBar from '../SearchBar';
import MovieService from '../../services/movie-service';

const pageSize = 6;

export default class SearchMovies extends Component {
  movieService = new MovieService();

  state = {
    status: 'done',
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
    console.error(e);
    this.setState({
      status: 'error',
    });
  };

  fetchMovies = (query, page = 1) => {
    this.setState({ current: page, query, status: 'loading' });
    if (query) {
      this.movieService
        .searchMovies(query, page)
        .then(this.onMoviesLoaded)
        .catch((e) => this.onError(e));
    } else {
      this.setState({ status: 'loading' });
    }
  };

  onChange = (page) => {
    const { query } = this.state;
    this.fetchMovies(query, page);
  };

  render() {
    const { movies, status, total, current } = this.state;

    return (
      <>
        <SearchBar onSearch={this.fetchMovies} />
        <MovieList
          movies={movies}
          status={status}
          current={current}
          total={total}
          onChange={this.onChange}
          pageSize={pageSize}
        />
      </>
    );
  }
}
