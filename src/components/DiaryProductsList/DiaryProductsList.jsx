import React from 'react';
import styles from './DiaryProductsList.module.css';
import { useSelector } from 'react-redux';
import { selectDiaryProducts } from '../../redux/diary/selectors';

const DiaryProductsList = () => {

  const products = useSelector(selectDiaryProducts);

  
  console.log(products);

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
            {products.map(({weight,product}) => (
              <tr key={product._id}>
                <td>
                  {product.title}
                </td>
                <td>{product.weight}</td>
                <td>{weight }g</td>
                <td>{product.calories} kcal</td>
                <td>
                  <button 
                    
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