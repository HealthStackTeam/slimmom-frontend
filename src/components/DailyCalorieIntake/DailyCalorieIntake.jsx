import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DailyCalorieIntake.module.css';
import { selectDailyRate, selectNotAllowedProducts } from '../../redux/dailyRate/selectors';

const DailyCalorieIntake = () => {
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your recommended daily calorie intake is</h2>
      
      <div className={styles.caloriesWrapper}>
        <span className={styles.caloriesCount}>
          {dailyRate ? dailyRate : 0}
        </span>
        <span className={styles.caloriesUnit}>kcal</span>
      </div>

      <div className={styles.productsListWrapper}>
        <h3 className={styles.productsTitle}>Foods you should not eat</h3>
        
        <ol className={styles.productsList}>
          {notAllowedProducts && notAllowedProducts.length > 0 ? (
            notAllowedProducts.map((product, index) => (
              <li key={index} className={styles.productItem}>
                {typeof product === 'object' ? product.title : product}
              </li>
            ))
          ) : (
            <li className={styles.productItem}>Here is your diet...</li>
          )}
        </ol>
      </div>

    </div>
  );
};

export default DailyCalorieIntake;