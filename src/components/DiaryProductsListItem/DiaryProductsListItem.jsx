import React from 'react';
import styles from './DiaryProductsListItem.module.css';
import DiaryAddProductForm from '../DiaryAddProductForm/DiaryAddProductForm';

const DiaryProductsListItem = ({ selectedDate }) => {
  const handleProductAdded = () => {
    window.history.back();
  };

  return (
    <div className={styles.addPageContainer}>
      <DiaryAddProductForm 
        selectedDate={selectedDate}
        onProductAdded={handleProductAdded}
        isFullPage={true}
      />
    </div>
  );
};

export default DiaryProductsListItem;