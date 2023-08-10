import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import './search-bar.css';

export default class newTaskForm extends Component {
  state = {
    label: '',
  };

  searchDebounce = debounce(() => {
    const { onSearch } = this.props;
    const { label } = this.state;
    onSearch(label);
  }, 500);

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
    this.searchDebounce();
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.searchDebounce.flush();
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Type to search..."
          autoFocus
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

newTaskForm.defaultProps = {
  onSearch: () => {},
};

newTaskForm.propTypes = {
  onSearch: PropTypes.func,
};
