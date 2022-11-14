import PropTypes from 'prop-types';
import Cat from 'components/Image/cat.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcSearch } from 'react-icons/fc';
import { SearchBar, Form, Button, Field } from './SearchBar.styled';

export const SearchForm = ({ submit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.warn('Введите имя для поиска картинок', {
        icon: () => <img src={Cat} alt="cat" />,
        autoClose: 2000,
        theme: 'dark',
      });
    }
    submit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <SearchBar>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <FcSearch />
          </Button>
          <Field
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBar>
      <ToastContainer />
    </>
  );
};

SearchBar.propTypes = {
  submit: PropTypes.func,
};
