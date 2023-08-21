import { Component, useContext } from 'react';

import './App.css';

import NavBar from '../NavBar';
import SearchMovies from '../SearchMovies';
import RatedMovies from '../RatedMovies';
import { GenresContext, SessionContext } from '../Context';

export default class App extends Component {
  state = {
    navEls: [{ name: 'Search' }, { name: 'Rated' }],
    navActive: 'Search',
  };

  onNavChange = (nav) => {
    this.setState({ navActive: nav });
  };

  render() {
    const { navEls, navActive } = this.state;
    return (
      <div className="App">
        <NavBar navEls={navEls} navActive={navActive} onNavChange={this.onNavChange} />
        <PageContent navActive={navActive} />
      </div>
    );
  }
}

function PageContent({ navActive }) {
  const genresArr = useContext(GenresContext);
  const sesId = useContext(SessionContext);
  const content = navActive === 'Search' ? <SearchMovies sesId={sesId} /> : <RatedMovies sesId={sesId} />;
  return <GenresContext.Provider value={genresArr}>{content}</GenresContext.Provider>;
}
