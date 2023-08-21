/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */
export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'api_key=011cb70db676bba042f43376eea9b6cd';

  _optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  _optionsPost = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  };

  _optionsDelete = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  async getResource(path, params = '') {
    const url = `${path}?${this._apiKey}&${params}`;
    const res = await fetch(`${this._apiBase}${url}`, this._optionsGet);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async postResource(body, path, params = '') {
    const url = `${path}?${this._apiKey}&${params}`;
    const _options = { ...this._optionsPost, body };
    const res = await fetch(`${this._apiBase}${url}`, _options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async deleteResource(path, params = '') {
    const url = `${path}?${this._apiKey}&${params}`;
    const res = await fetch(`${this._apiBase}${url}`, this._optionsDelete);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async searchMovies(sesId, searchLine, page = 1) {
    const res = await this.getResource('/search/movie', `query=${searchLine}&page=${page}&guest_session_id=${sesId}`);
    const searchRes = { movies: res.results.map(this._transformMovie), total: res.total_pages };
    const rateRes = await this.getRatedMovies(sesId, page);
    return {
      movies: searchRes.movies.map((y) =>
        Object.assign(
          y,
          rateRes.movies.find((x) => x.id === y.id)
        )
      ),
      total: res.total_pages,
    };
  }

  _transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      overview: movie.overview,
      genres: movie.genre_ids,
      vote: movie.vote_average,
      rating: movie.rating,
    };
  }

  async newGuestSesson() {
    const res = await this.getResource('/authentication/guest_session/new');
    if (res.success) return res.guest_session_id;
    throw new Error(res);
  }

  async getRatedMovies(sesId, page = 1) {
    const res = await this.getResource(`/guest_session/${sesId}/rated/movies`, `page=${page}&sort_by=created_at.asc`);
    return { movies: res.results.map(this._transformMovie), total: res.total_pages };
  }

  async rateMovie(sesId, filmId, rate) {
    if (rate === 0) this.deleteRating(sesId, filmId);
    else await this.postResource(`{"value":${rate}}`, `/movie/${filmId}/rating`, `guest_session_id=${sesId}`);
  }

  async deleteRating(sesId, filmId) {
    await this.deleteResource(`/movie/${filmId}/rating`, `guest_session_id=${sesId}`);
  }

  async getGenres() {
    const res = await this.getResource('/genre/movie/list', 'language=en');
    return res;
  }
}
