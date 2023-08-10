/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */
export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'api_key=5f634938596666e63f662e0507dcce1d';

  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjYzNDkzODU5NjY2NmU2M2Y2NjJlMDUwN2RjY2UxZCIsInN1YiI6IjY0YWQ3ZTgyOGEwZTliMDExZDhjZTYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZBPIz_b6vGexVJVc6-jEpUVuYBiMPmmMH14VeOOPFtk',
    },
  };

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}&${this._apiKey}`, this._options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async searchMovies(searchLine, page = 1) {
    const res = await this.getResource(`/search/movie?query=${searchLine}&page=${page}`);
    return { movies: res.results.map(this._transformMovie), total: res.total_pages };
  }

  _transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
      genres: movie.genre_ids,
      vote: movie.vote_average,
    };
  }

  async newGuestSesson() {
    const res = await this.getResource('/authentication/guest_session/new');
    if (res.success) return { id: res.guest_session_id };
    console.log('err');
    return 0;
  }

  async getGenres() {
    const res = await this.getResource('/genre/movie/list?language=en');
    return res;
  }
}
