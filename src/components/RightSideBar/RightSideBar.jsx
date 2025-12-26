import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';

import { selectNotAllowedProducts, selectDailyRate } from '../../redux/dailyRate/selectors';
import { selectCaloriesConsumed, selectCaloriesLeft, selectCaloriesPercent } from '../../redux/diary/selectors';

const RightSideBar = () => {
  // pull data from redux store
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  const consumed = useSelector(selectCaloriesConsumed);
  const left = useSelector(selectCaloriesLeft);
  const percent = useSelector(selectCaloriesPercent);

  // date formatting
  const today = new Date().toLocaleDateString('en-GB'); // "DD/MM/YYYY" formatı

  return (
    <div className={styles.container}>
      <div className={styles.summaryContainer}>
        <h3 className={styles.title}>Summary for {today}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span>Left</span>
            <span>{left ? left : '0'} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>Consumed</span>
            <span>{consumed ? consumed : '0'} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>Daily Rate</span>
            <span>{dailyRate ? dailyRate : '0'} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span>n% of normal</span>
            <span>{percent ? percent : '0'} %</span>
          </li>
        </ul>
      </div>

      <div className={styles.foodContainer}>
        <h3 className={styles.title}>Food not recommended</h3>
        {notAllowedProducts && notAllowedProducts.length > 0 ? (
          <ul className={styles.foodList}>
            {notAllowedProducts.map((product, index) => (
              <li key={index} className={styles.foodItem}>
                {product},&nbsp; 
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.text}>Your diet will be displayed here</p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;