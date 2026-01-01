import Header from '../components/Header/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DiaryDateCalendar from '../components/DiaryDateСalendar/DiaryDateСalendar';
import DiaryAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../components/DiaryProductsList/DiaryProductsList';
import { fetchDiary } from '../redux/diary/operations';
import RightSidebar from '../components/RightSideBar/RightSideBar';
import styles from './DiaryPage.module.css';
import { Link } from 'react-router-dom';
const DiaryPage = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!selectedDate){ const today = new Date();
      const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      setSelectedDate(formattedToday);
      return;
    }
    dispatch(fetchDiary(selectedDate));
  }, [dispatch, selectedDate]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <DiaryDateCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DiaryAddProductForm selectedDate={selectedDate} />
        <DiaryProductsList selectedDate={selectedDate} />
        <Link 
          to="/diary/add"
          className={styles.floatingButton}
          aria-label="Add product"
        >
          +
        </Link>
      </div>
      <RightSidebar selectedDate={selectedDate} />
    </div>
  );
};

export default DiaryPage;
