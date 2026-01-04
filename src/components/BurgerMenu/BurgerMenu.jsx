import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BurgerMenu.module.css';
import UserInfo from '../UserInfo/UserInfo';

import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const BurgerMenu = ({ open, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const menuRef = useRef(null);
  const [show, setShow] = useState(open);
  const [exiting, setExiting] = useState(false);

  // Handle open/close transitions
  useEffect(() => {
    if (open) {
      setShow(true);
      setExiting(false);
    } else if (show) {
      setExiting(true);
      const timeout = setTimeout(() => {
        setShow(false);
        setExiting(false);
      }, 700); // match CSS animation duration
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // ESC ile kapatma
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Dışarı tıklama ile kapatma
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  // Navigasyon ile kapatma
  const handleNavClick = () => {
    onClose();
  };

  if (!isLoggedIn || !show) return null;

  return (
    <div className={styles.menu + ' ' + (open ? styles.open : '')}>
      <nav
        className={
          styles.menuContent + (exiting ? ' ' + styles.menuContentExit : '')
        }
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.exitButton}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        >
          &#10005;
        </button>
        {/* Tablet view: show avatar and name at top */}
        <div className={styles.userInfoTabletOnly}>
          <UserInfo />
        </div>
        <ul className={styles.burgerNavList}>
          <li>
            <NavLink
              to="/diary"
              className={({ isActive }) =>
                isActive
                  ? `${styles.burgerNavLink} ${styles.activeLink}`
                  : styles.burgerNavLink
              }
              onClick={handleNavClick}
            >
              DIARY
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calculator"
              className={({ isActive }) =>
                isActive
                  ? `${styles.burgerNavLink} ${styles.activeLink}`
                  : styles.burgerNavLink
              }
              onClick={handleNavClick}
            >
              CALCULATOR
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
