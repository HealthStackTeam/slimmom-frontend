import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import {
  selectNotAllowedProducts,
  selectDailyRate,
} from '../../redux/dailyRate/selectors';
import {
  selectCaloriesConsumed,
  selectCaloriesLeft,
  selectCaloriesPercent,
} from '../../redux/diary/selectors';

const RightSideBar = ({ selectedDate }) => {
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  const consumed = useSelector(selectCaloriesConsumed);
  const left = useSelector(selectCaloriesLeft);
  const percent = useSelector(selectCaloriesPercent);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const containerClass = isLoggedIn
    ? `${styles.container} ${styles.bgImage}`
    : styles.container;

  // Format functions
  const formatCalories = (value) => {
    if (value === null || value === undefined) return '0';
    // Yüzdeyi tam sayı olarak göster
    return Math.round(value);
  };
  // Kullanıcıya DD.MM.YYYY göster
  const getDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <div className={containerClass}>
      <div className={styles.summaryContainer}>
        <h3 className={styles.title}>
          Summary for {getDisplayDate(selectedDate)}
          {left < 0 && (
            <span className={styles.exclamationWrapper}>
              <span className={styles.exclamation}>!</span>
              <span className={styles.tooltip}>
                You have exceeded your daily calorie limit by{' '}
                {Math.abs(formatCalories(left))} kcal. Please be careful with
                your diet!
              </span>
            </span>
          )}
        </h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span>Left</span>
            <span className={left < 0 ? styles.negative : ''}>
              {formatCalories(left) ? formatCalories(left) : '0'} kcal
            </span>
          </li>
          <li className={styles.listItem}>
            <span>Consumed</span>
            <span>
              {formatCalories(consumed) ? formatCalories(consumed) : '0'} kcal
            </span>
          </li>
          <li className={styles.listItem}>
            <span>Daily Rate</span>
            <span>
              {formatCalories(dailyRate) ? formatCalories(dailyRate) : '0'} kcal
            </span>
          </li>
          <li className={styles.listItem}>
            <span>n% of normal</span>
            <span>
              {formatCalories(percent) ? formatCalories(percent) : '0'}%
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.foodContainer}>
        <h3 className={styles.title}>Food not recommended</h3>
        {notAllowedProducts && notAllowedProducts.length > 0 ? (
          <ul className={styles.foodList}>
            {notAllowedProducts.map((product, index) => (
              <li key={index} className={styles.foodItem}>
                {typeof product === 'object' ? product.title : product}
                {index < notAllowedProducts.length - 1 && ','}
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
