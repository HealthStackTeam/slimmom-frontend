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
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.title || 
                   product.product?.title || 
                   product.productName || 
                   "Product"}
                </td>
                <td>{product.weight || product.amount}g</td>
                <td>{product.calories || 0} kcal</td>
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