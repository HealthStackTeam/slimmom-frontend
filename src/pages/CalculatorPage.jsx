import React, { useState } from 'react';
import CalculatorCalorieForm from '../components/CalculatorСalorieForm/CalculatorСalorieForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import Modal from '../components/Modal/Modal';
import styles from './CalculatorPage.module.css';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';

const CalculatorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getTodayDate = () => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSection}>
        <CalculatorCalorieForm onSuccess={openModal} />
      </div>

      <RightSideBar selectedDate={getTodayDate()} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
           <DailyCaloriesForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;