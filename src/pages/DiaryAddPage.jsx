import React from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryProductsListItem from '../components/DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryAddPage.module.css';
import { ArrowLeft } from 'lucide-react'; 

const DiaryAddPage = () => {
  const navigate = useNavigate();
  
  // Bugünün tarihi
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Geri butonu
  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      </header>
      
      
      <main className={styles.mainContent}>
        <DiaryProductsListItem selectedDate={formattedDate} />
      </main>
    </div>
  );
};

export default DiaryAddPage;