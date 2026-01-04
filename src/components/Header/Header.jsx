import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1279 });
  return (
    <header className={styles.header}>
      {isTabletOrMobile
        ? <div className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.rightSide}>
          <div className={styles.desktopNav}>
            <Navigation isLoggedIn={isLoggedIn} />
          </div>
          <div className={styles.userAndHamburger}> <div className={styles.user}> <UserInfo isLoggedIn={isLoggedIn} /></div>

            {isLoggedIn && (<div className={styles.hamburger}><img src="/src/assets/hamburger.svg" alt="Hamburger menu"></img></div>
            )}
          </div>
        </div>

      </div>
        : <div className={styles.container}>
          <div className={styles.leftSide}>
            <Logo />
            <div className={styles.desktopNav}>
              <Navigation isLoggedIn={isLoggedIn} />
            </div>
          </div>
          <div className={styles.rightSide}><UserInfo isLoggedIn={isLoggedIn} /></div>
        </div>}
     
    </header>
  );
};

export default Header;
