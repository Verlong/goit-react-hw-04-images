import React, { useState } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imagegallery/ImageGallery';
import Modal from './modal/Modal';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const getInputValue = handleValue => {
    setInputValue(handleValue);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar getInputValue={getInputValue} />
      <ImageGallery
        inputValue={inputValue}
        onClick={getLargeImg}
        loadMoreBtn={loadMoreBtn}
        page={page}
      />
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  );
};

export default App;
