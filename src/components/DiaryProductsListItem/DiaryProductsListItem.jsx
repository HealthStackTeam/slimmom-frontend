// DiaryProductsListItem.jsx
import React from 'react';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ product, onDelete }) => {
  return (
    <div className={styles.item}>
      <div className={styles.productName}>
        {product.name}
      </div>
      
      <div className={styles.details}>
        <div className={styles.grams}>
          {product.grams} g
        </div>
        
        <div className={styles.calories}>
          {product.calories} kcal
        </div>
      </div>
    </div>
  );
};

export default DiaryProductsListItem;