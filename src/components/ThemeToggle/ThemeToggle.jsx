import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Toggle Dark Mode">
      {theme === 'light' ? (
        <FaMoon size={20} color="#212121" />
      ) : (
        <FaSun size={20} color="#fc842d" />
      )}
    </button>
  );
};

export default ThemeToggle;