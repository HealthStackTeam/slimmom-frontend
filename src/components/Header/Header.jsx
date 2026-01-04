import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1279 });
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <header className={styles.header}>
      {isTabletOrMobile ? (
        <div className={styles.container}>
          <Logo className={styles.logo} />
          <div className={styles.rightSide}>
            <div className={styles.desktopNav}>
              <Navigation isLoggedIn={isLoggedIn} />
            </div>
            <div className={styles.userAndHamburger}>
              {' '}
              <div className={styles.user}>
                {' '}
                <UserInfo isLoggedIn={isLoggedIn} />
              </div>
              {isLoggedIn && (
                <>
                  <div
                    className={styles.hamburger}
                    onClick={() => setShowBurgerMenu(true)}
                  >
                    <FaBars />
                  </div>
                  <BurgerMenu
                    open={showBurgerMenu}
                    onClose={() => setShowBurgerMenu(false)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <Logo />
            <div className={styles.desktopNav}>
              <Navigation isLoggedIn={isLoggedIn} />
            </div>
          </div>
          <div className={styles.rightSide}>
            <UserInfo isLoggedIn={isLoggedIn} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
