import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import styles from './UserInfoMobile.module.css';

const UserInfoMobile = ({ isLoggedIn }) => {
  return (
    <div className={styles.userInfoMobileWrapper}>
      <UserInfo isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default UserInfoMobile;
