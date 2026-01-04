import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import Header from '../Header/Header';
import UserInfoMobile from '../UserInfo/UserInfoMobile';

const Layout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <UserInfoMobile />
      <Outlet />
    </div>
  );
};

export default Layout;
