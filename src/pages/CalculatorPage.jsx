import React, { useState } from 'react';
import CalculatorCalorieForm from '../components/CalculatorСalorieForm/CalculatorСalorieForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import Modal from '../components/Modal/Modal';
import DailyCalorieIntake from '../components/DailyCalorieIntake/DailyCalorieIntake';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <RightSideBar />

      {isModalOpen && (
        <Modal onClose={closeModal}>
           <DailyCalorieIntake onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;