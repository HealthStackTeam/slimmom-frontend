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
            {products.map(({_id,weight,product}) => (
              <tr key={product._id}>
                <td>
                  {product.title}
                </td>
                <td>{product.calories}kcal</td>
                <td>{weight }g</td>
                <td>{product.calories * (weight/100) }</td>
                <td>
                  <button 
                    onClick={()=> handleDeleteProduct(_id)}
                    className={styles.deleteButton}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiaryProductsList;