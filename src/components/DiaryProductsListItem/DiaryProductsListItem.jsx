import React from 'react';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ product, onDelete }) => {
  return (
    <div className={styles.item}>
      <div className={styles.productInfo}>
        <div className={styles.productName}>
          {product.title || product.productName || "product"}
        </div>
        <div className={styles.productDetails}>
          <span className={styles.grams}>{product.weight || product.amount}g</span>
          <span className={styles.calories}>{product.calories || 0} kcal</span>
        </div>
      </div>
      
      {onDelete && (
        <button 
          className={styles.deleteButton}
          onClick={() => onDelete(product._id || product.id)}
          title="delete"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DiaryProductsListItem;