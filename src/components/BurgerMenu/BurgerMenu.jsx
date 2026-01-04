import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BurgerMenu.module.css';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className={styles.burgerButton}
        aria-label="Open navigation menu"
        onClick={handleToggle}
      >
        <span className={styles.burgerIcon} />
      </button>
      <div
        className={open ? `${styles.menu} ${styles.open}` : styles.menu}
        onClick={handleClose}
      >
        <nav
          className={styles.menuContent}
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation isLoggedIn={isLoggedIn} />
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;
