import React from 'react';
import styles from './DiaryProductsListItem.module.css';
import DiaryAddProductForm from '../DiaryAddProductForm/DiaryAddProductForm';
import toast from 'react-hot-toast';
import { ErrorMessage } from 'formik';

const DiaryProductsListItem = ({ selectedDate }) => {
  const handleProductAdded = () => {
    toast.success('Product added successfully!', {
      duration: 4000,
      position: 'top-right',
      styles: {
        background: '#4CAF50',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '14px',
      },

    });
    
       window.history.back();
  };
  const handleFromError = ( ErrorMessage ) => {
    //Form hataları için taost mesajı
    toast.error( ErrorMessage , {
      duration: 4000,
      position: 'top-right',
      styles: {
        background: '#ff4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '14px',
      },
    });
  };

  return (
    <div className={styles.addPageContainer}>
      <DiaryAddProductForm 
        selectedDate={selectedDate}
        onProductAdded={handleProductAdded}
        onFormError={handleFromError}
        isFullPage={true}
      />
    </div>
  );
};

export default DiaryProductsListItem;