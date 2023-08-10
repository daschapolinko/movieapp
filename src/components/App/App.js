import { Component, useContext } from 'react';
import { Rate } from 'antd';

import './App.css';

import MovieList from '../MovieList';
import NavBar from '../NavBar';
import SearchMovies from '../SearchMovies';
import { GenresContext } from '../GenresContext';

export default class App extends Component {
  state = {
    movies: [],
    navEls: [{ name: 'Search' }, { name: 'Rated' }],
    navActive: 'Search',
  };

  onNavChange = (nav) => {
    this.setState({ navActive: nav });
  };

  render() {
    const { movies, navEls, navActive } = this.state;
    return (
      <div className="App">
        <NavBar navEls={navEls} navActive={navActive} onNavChange={this.onNavChange} />
        <PageContent navActive={navActive} movies={movies} />;
        <div className="movie">
          <img
            className="movie__img"
            alt="Ret"
            src="https://image.tmdb.org/t/p/original/dozS8dYtledcoJqvBsl4GCj5zod.jpg"
          />
          <div className="movie__info">
            <h5 className="movie__title">Ret</h5>
            <span className="movie__vote">6.3</span>
            <sub className="movie__date">July 10, 2015</sub>
            <div className="movie__genres">
              <div className="movie__genre">1836</div>
            </div>
            <div className="movie__description">
              A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
              attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high...
            </div>
            <Rate
              allowHalf
              count={10}
              style={{
                fontSize: 15,
              }}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    );
  }
}

function PageContent({ navActive, movies }) {
  const content = navActive === 'Search' ? <SearchMovies /> : <MovieList movies={movies} />;
  const genresArr = useContext(GenresContext);
  return <GenresContext.Provider value={genresArr}>{content}</GenresContext.Provider>;
}
