import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import styles from './UserInfoMobile.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const UserInfoMobile = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? (
    <div className={styles.userInfoMobile}>
      <div className={styles.userInfoMobileInner}>
        {' '}
        <UserInfo />
      </div>
    </div>
  ) : null;
};

export default UserInfoMobile;
