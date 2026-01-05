import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useState } from 'react';
import ConfirmLogoutModal from '../Modal/ConfirmLogoutModal';

const UserInfo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Modal logic taşındı

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

  return isLoggedIn ? (
    <div className={styles.container}>
      <span className={styles.avatar}>{initial}</span>
      <span className={styles.name}>{user.name}</span>
      <button className={styles.logoutBtn} onClick={handleLogoutClick}>
        Exit
      </button>
      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  ) : null;
};

export default UserInfo;
