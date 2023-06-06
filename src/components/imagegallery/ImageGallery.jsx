import React from 'react';
import css from '../../styles/styles.module.css';
// import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imagegalleryitem/ImageGalleryItem';
import getImages from 'picapi/PicApi';
import { PER_PAGE } from 'picapi/PicApi';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

const ImageGallery = ({ onClick, inputValue, page }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalPages, setTotalPages] = useState(0);
  const [shouldShowLoadMore, setShouldShowLoadMore] = useState(false);

  useEffect(() => {
    const fetchLoad = () => {
      setStatus('pending');
      getImages(inputValue, page)
        .then(response => {
          const totalPages = Math.ceil(response.totalHits / PER_PAGE);
          const shouldShowLoadMore = totalPages > 1;

          setImages(response.hits);
          setStatus('resolve');
          setTotalPages(totalPages);
          setShouldShowLoadMore(shouldShowLoadMore);
        })
        .catch(error => setStatus('rejected'));
    };

    if (inputValue !== '') {
      fetchLoad();
    }
  }, [inputValue, page]);

  const fetchLoadMore = () => {
    getImages(inputValue, page)
      .then(response => {
        setImages(images => [...images, ...response.hits]);
        setStatus('resolve');
      })
      .catch(error => setStatus('rejected'));
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolve') {
    return (
      <div className={css.galleryWrapper}>
        <ul className={css.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {shouldShowLoadMore &&
          (page < totalPages ? (
            <Button onClick={fetchLoadMore} />
          ) : (
            Notiflix.Notify.failure('No more results')
          ))}
        {images.length === 0 && Notiflix.Notify.failure('No results')}
      </div>
    );
  }

  return null;
};

export default ImageGallery;
