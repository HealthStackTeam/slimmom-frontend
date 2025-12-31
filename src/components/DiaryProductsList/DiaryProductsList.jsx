import React from 'react';
import styles from './DiaryProductsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiaryProducts } from '../../redux/diary/selectors';
import { deleteProduct } from '../../redux/diary/operations';

const DiaryProductsList = () => {
  const products = useSelector(selectDiaryProducts);
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  }

  const calculateTotalCalories = (productCalories, weight) => {
    return Math.round(productCalories * (weight / 100));
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.emptyMessage}>
                  No products added yet
                </td>
              </tr>
            ) : (
              products.map(({_id, weight, product}) => (
                <tr key={_id}>
                  <td>
                    {product.title}
                  </td>
                  <td>{weight}g</td>
                  <td>{calculateTotalCalories(product.calories, weight)} kcal</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteProduct(_id)}
                      className={styles.deleteButton}
                      aria-label={`Delete ${product.title}`}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiaryProductsList;