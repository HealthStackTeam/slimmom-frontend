import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import UserInfo from '../UserInfo/UserInfo';

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className={styles.nav}>
      {isLoggedIn ? (
        <div className={styles.authNav}>
          <NavLink
            to="/diary"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            DIARY
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            CALCULATOR
          </NavLink>
        </div>
      ) : (
        <div className={styles.publicNav}>
          <NavLink to="/login" className={styles.link}>
            LOG IN
          </NavLink>
          <NavLink to="/register" className={styles.link}>
            REGISTRATION
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
