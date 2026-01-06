import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import styles from './UserInfoMobile.module.css';

const UserInfoMobile = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <div className={styles.userInfoMobileWrapper}>
      <UserInfo isLoggedIn={isLoggedIn} />
    </div>
  ) : null;
};

export default UserInfoMobile;
