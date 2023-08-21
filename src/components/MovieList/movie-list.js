/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Space, Pagination } from 'antd';

import './movie-list.css';
import MovieCard from '../MovieCard';
import { GenresContext } from '../Context';

export default class MovieList extends Component {
  antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  render() {
    const genresArr = this.context;
    const { status, errorMessage, ...movieProps } = this.props;
    const errorMes = status === 'error' ? <ErrorMessage errorMessage={errorMessage} /> : null;
    const spinner = status === 'loading' ? <Spin indicator={this.antIcon} /> : null;
    const content = status === 'done' ? <Movies {...movieProps} genresArr={genresArr} /> : null;

    return (
      <div className="movie-list">
        {errorMes}
        {spinner}
        {content}
      </div>
    );
  }
}

MovieList.contextType = GenresContext;

function Movies({ movies, onChange, rateMovie, genresArr, ...pagProps }) {
  const elements = movies.map((movie) => {
    const { id, ...props } = movie;
    return <MovieCard key={id} genresArr={genresArr} rateMovie={(rate) => rateMovie(id, rate)} {...props} />;
  });

  return (
    <>
      <div className="movies">{elements}</div>
      <Pagination
        hideOnSinglePage
        size={document.documentElement.clientWidth < 340 ? 'small' : 'default'}
        onChange={(page) => onChange(page)}
        {...pagProps}
        showSizeChanger={false}
      />
    </>
  );
}

function ErrorMessage(errorMessage) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert
        message={errorMessage}
        description="Error Description Error Description Error Description Error Description"
        type="error"
      />
    </Space>
  );
}
