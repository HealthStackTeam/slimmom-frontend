import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const UserInfo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    isLoggedIn ? (    <div className={styles.container}>
      <span className={styles.avatar}>{initial}</span>
      <span className={styles.name}>{user.name}</span>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Exit
      </button>
    </div>) : null

  );
};

export default UserInfo;
