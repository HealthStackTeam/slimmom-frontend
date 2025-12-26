import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Calendar } from 'lucide-react';
import 'flatpickr/dist/themes/material_blue.css';
import styles from './DiaryDateСalendar.module.css';

const DiaryDateCalendar = ({ onDateChange, initialDate = new Date() }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (dates) => {
    const newDate = dates[0];
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateDisplay}>
        {formatDate(selectedDate)}
      </div>
      
      <Flatpickr
        value={selectedDate}
        onChange={handleDateChange}
        options={{
          dateFormat: 'd/m/Y',
          locale: 'tr',
          maxDate: new Date(),
          animate: true,
          disableMobile: true,
          wrap: true,
        }}
      >
        <div className={styles.calendarWrapper}>
          <input
            type="text"
            data-input
            className={styles.hiddenInput}
          />
          <button
            className={styles.calendarButton}
            data-toggle
            aria-label="Takvimi aç"
          >
            <Calendar size={24} />
          </button>
        </div>
      </Flatpickr>
    </div>
  );
};

export default DiaryDateCalendar;