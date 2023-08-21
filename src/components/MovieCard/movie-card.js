import React from 'react';
import { Rate } from 'antd';
//  import PropTypes from 'prop-types';
import './movie-card.css';
import format from 'date-fns/format';

import cover from './no-cover.png';

function kitcut(txt, limit) {
  if (txt === '') return 'No description available.';
  let text = txt.trim();
  if (text.length <= limit) return text;
  text = text.slice(0, limit);
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    text = text.substr(0, lastSpace);
  }
  return `${text}...`;
}

function MovieCard({ title, releaseDate, overview, posterPath, vote, genres, genresArr, rating, rateMovie }) {
  const ImgSrc = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : cover;
  const date = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : 'No date available';
  const genresList = genres.map((g) => {
    const id = genresArr.findIndex((genre) => genre.id === Number(g));
    const { name } = genresArr[id];
    return (
      <span className="movie__genre" key={name}>
        {name}
      </span>
    );
  });
  let VoteColor;
  switch (Math.floor(vote)) {
    case 1:
    case 2:
      VoteColor = { borderColor: '#E90000' };
      break;
    case 3:
    case 4:
      VoteColor = { borderColor: '#E97E00' };
      break;
    case 5:
    case 6:
      VoteColor = { borderColor: '#E9D100' };
      break;
    case 7:
    case 8:
    case 9:
      VoteColor = { borderColor: '#66E900' };
      break;
    default:
      break;
  }
  return (
    <div className="movie">
      <img className="movie__img" alt={title} src={ImgSrc} />
      <p className="movie__info">
        <span className="movie__vote" style={VoteColor}>
          {vote.toFixed(1)}
        </span>
        <span className="movie__title">{title}</span>
        <br />
        <sub className="movie__date">{`${date}`}</sub>
        <span className="movie__genres">{genresList}</span>
      </p>
      <p className="movie__description">{kitcut(overview, 210)}</p>
      <Rate
        allowHalf
        count={10}
        defaultValue={rating}
        className="movie__rate"
        onChange={(rate) => {
          rateMovie(rate);
        }}
      />
    </div>
  );
}

MovieCard.defaultProps = {};

MovieCard.propTypes = {};

export default MovieCard;
