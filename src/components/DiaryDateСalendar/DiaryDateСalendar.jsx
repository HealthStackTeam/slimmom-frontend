import Flatpickr from 'react-flatpickr';
import { Calendar } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import styles from './DiaryDateСalendar.module.css';
import { useTheme } from '../../context/ThemeContext';

const DiaryDateCalendar = ({ selectedDate, setSelectedDate }) => {
  const { theme } = useTheme();

  // Dynamically load Flatpickr theme CSS based on app theme
  useEffect(() => {
    // Remove previous theme link if exists
    const prevThemeLink = document.getElementById('flatpickr-theme');
    if (prevThemeLink) {
      prevThemeLink.parentNode.removeChild(prevThemeLink);
    }
    // Add new theme link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'flatpickr-theme';
    link.href =
      theme === 'dark'
        ? '/src/assets/flatpickr-themes/dark.css'
        : '/src/assets/flatpickr-themes/confetti.css';
    document.head.appendChild(link);
  }, [theme]);
  const initialDate = useMemo(() => new Date(), []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!selectedDate) {
      const initial = formatDate(initialDate);
      setSelectedDate(initial);
    }
  }, [selectedDate, setSelectedDate, initialDate]);

  const handleDateChange = (dates) => {
    const newDate = dates[0];
    setSelectedDate(formatDate(newDate)); // formatDate ile string'e çeviriyorsan, Flatpickr'a Date objesi ver!
  };

  // Kullanıcıya DD.MM.YYYY göster
  const getDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateDisplay}>
        {selectedDate
          ? getDisplayDate(selectedDate)
          : getDisplayDate(formatDate(initialDate))}
      </div>
      <Flatpickr
        value={selectedDate ? new Date(selectedDate) : new Date()}
        onChange={handleDateChange}
        options={{
          dateFormat: 'd/m/Y',
          maxDate: new Date(),
          animate: true,
          disableMobile: true,
          wrap: true,
        }}
      >
        <div className={styles.calendarWrapper}>
          <input type="text" data-input className={styles.hiddenInput} />
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
