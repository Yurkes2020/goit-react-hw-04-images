import PropTypes from 'prop-types';
import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { SearchBar, Form, Button, Field } from './SearchBar.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSearchChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Please enter a search query');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FcSearch />
          </Button>
          <Field
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBar>
    );
  }
}
