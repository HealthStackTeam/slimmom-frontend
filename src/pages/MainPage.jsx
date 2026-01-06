import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import CalculatorCalorieForm from '../components/CalculatorСalorieForm/CalculatorСalorieForm';
import DailyCalorieIntake from '../components/DailyCalorieIntake/DailyCalorieIntake';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import styles from './CommonPage.module.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles['page-container']}>
      <div>
        <CalculatorCalorieForm onSuccess={openModal} />
      </div>

      {isLoggedIn && <RightSideBar />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DailyCaloriesForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
