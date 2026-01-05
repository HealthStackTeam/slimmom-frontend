import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useCallback, useEffect, useState } from 'react';

const UserInfo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!showLogoutModal) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowLogoutModal(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showLogoutModal]);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        setShowLogoutModal(false);
      }
    },
    []
  );
  // const handleLogout = () => {
  //   setShowLogoutModal(true);
  // };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleConfirmLogout = async () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };
  const initial = user.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    isLoggedIn ? (<div className={styles.container}>
      <span className={styles.avatar}>{initial}</span>
      <span className={styles.name}>{user.name}</span>
      <button className={styles.logoutBtn} onClick={handleLogoutClick}>
        Exit
      </button>
      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>

              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Confirm Log Out</h3>
              </div>
              <p className={styles.modalText}>
                Are you sure you want to log out?
              </p>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleConfirmLogout}
                >
                  Log Out
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>) : null

  );
};

export default UserInfo;
