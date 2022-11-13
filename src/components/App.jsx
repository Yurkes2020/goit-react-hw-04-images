import { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Load } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import { SearchForm } from './SearchBar/SearchBar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { fetchArticlesWithQuery } from 'components/Api/Api';
import { Conteiner } from './App.styled';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    imageLarge: '',
    tags: '',
    page: 1,
    status: 'idle',
    error: null,
    showLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const searchQuery = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== searchQuery || prevPage !== nextPage) {
      this.getImages(searchQuery, nextPage);
    }
  }

  getImages(searchQuery, page) {
    this.setState({ showLoader: true });
    fetchArticlesWithQuery(searchQuery, page)
      .then(data => {
        if (data.length === 0) {
          this.setState({ status: 'rejected' });
          return;
        }
        data.map(({ id, webformatURL, largeImageURL, tags }) =>
          this.setState(prevState => ({
            hits: [
              ...prevState.hits,
              { id, webformatURL, largeImageURL, tags },
            ],
            status: 'resolved',
            showLoader: false,
          }))
        );
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }

  onClickButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      hits: [],
    });
  };

  openModal = (largeImg, tag) => {
    this.setState({
      imageLarge: largeImg,
      tags: tag,
    });
  };

  closeModal = () => {
    this.setState({
      imageLarge: '',
      tags: '',
    });
  };

  render() {
    return (
      <Conteiner>
        <SearchForm onSubmit={this.handleFormSubmit} />
        {this.state.status === 'idle' && (
          <p style={{ textAlign: 'center' }}>Введите имя запроса</p>
        )}

        {this.state.status === 'rejected' && (
          <p style={{ textAlign: 'center' }}>
            По Вашему запросу ничего не найдено
          </p>
        )}
        {this.state.status === 'resolved' && (
          <Gallery images={this.state.hits} modal={this.openModal} />
        )}
        {this.state.showLoader && <Loader />}

        {this.state.imageLarge && (
          <Modal
            img={this.state.imageLarge}
            tag={this.state.tags}
            closeModal={this.closeModal}
          />
        )}
        {this.state.hits.length >= 12 && (
          <Load loadMore={this.onClickButtonLoadMore} text={'Load More'} />
        )}
      </Conteiner>
    );
  }
}
