/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React from 'react';
import { Rate } from 'antd';
//  import PropTypes from 'prop-types';
import './movie-card.css';
import format from 'date-fns/format';

function MovieCard({ title, release_date, overview, poster_path, vote, genres, genresArr }) {
  if (!release_date) release_date = new Date();
  const date = format(new Date(release_date), 'MMMM dd, yyyy');
  const genresList = genres.map((g) => {
    const id = genresArr.findIndex((genre) => genre.id === Number(g));
    const { name } = genresArr[id];
    return (
      <span className="movie__genre" key={name}>
        {name}
      </span>
    );
  });
  return (
    <div className="movie">
      <img className="movie__img" alt={title} src={`https://image.tmdb.org/t/p/original${poster_path}`} />
      <div className="movie__info">
        <h5 className="movie__title">{title}</h5>
        <span className="movie__vote">{vote.toFixed(1)}</span>
        <sub className="movie__date">{`${date}`}</sub>
        <div className="movie__genres">{genresList}</div>
        <p className="movie__description">{overview}</p>
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
  );
}

MovieCard.defaultProps = {};

MovieCard.propTypes = {};

export default MovieCard;
