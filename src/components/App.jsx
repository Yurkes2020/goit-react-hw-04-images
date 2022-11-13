import { useState } from 'react';
import { Modal } from './Modal/Modal';
import { Load } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import { SearchForm } from './SearchBar/SearchBar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { fetchArticlesWithQuery } from 'components/Api/Api';
import { Conteiner } from './App.styled';
import { useEffect } from 'react';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageLarge, setImageLarge] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = (searchQuery, page) => {
    setShowLoader(true);
    fetchArticlesWithQuery(searchQuery, page)
      .then(data => {
        if (data.length === 0) {
          setStatus('rejected');
          setShowLoader(false);
          return;
        }
        data.map(
          ({ id, webformatURL, largeImageURL, tags }) =>
            setHits(prevState => [
              ...prevState,
              { id, webformatURL, largeImageURL, tags },
            ]),
          setStatus('resolved'),
          setShowLoader(false)
        );
      })
      .catch(error => setError(error))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  const onClickButtonLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setHits([]);
  };

  const openModal = (largeImg, tag) => {
    setImageLarge(largeImg);
    setTags(tag);
  };

  const closeModal = () => {
    setImageLarge();
    setTags();
  };

  return (
    <Conteiner>
      <SearchForm onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <p style={{ textAlign: 'center' }}>Введите имя запроса</p>
      )}

      {status === 'rejected' && (
        <p style={{ textAlign: 'center' }}>
          По Вашему запросу ничего не найдено
        </p>
      )}
      {status === 'resolved' && <Gallery images={hits} modal={openModal} />}
      {showLoader && <Loader />}

      {imageLarge && (
        <Modal img={imageLarge} tag={tags} closeModal={closeModal} />
      )}
      {hits.length >= 12 && (
        <Load loadMore={onClickButtonLoadMore}>Load More</Load>
      )}
    </Conteiner>
  );
};
