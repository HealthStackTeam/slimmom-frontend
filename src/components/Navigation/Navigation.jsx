import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useMediaQuery } from 'react-responsive';

const Navigation = ({ isLoggedIn }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1279 });
  return (
    <nav className={styles.nav}>
      
      {!isTabletOrMobile
        ? (isLoggedIn ? (
        <div className={styles.authNav}>
          <NavLink
            to="/diary"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            DIARY
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            CALCULATOR
          </NavLink>
        </div>
      ) :  (
        <div className={styles.publicNav}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            LOG IN
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            REGISTRATION
          </NavLink>
        </div>
      ))
        : (
          <div className={isLoggedIn ? styles.mobileNav 
          : styles.publicNav}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
              }
            >
              LOG IN
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
              }
            >
              REGISTRATION
            </NavLink>
          </div>
        )
      }
    </nav>
  );
};

export default Navigation;
