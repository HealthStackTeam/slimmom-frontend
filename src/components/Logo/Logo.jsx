import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../../context/ThemeContext';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './Logo.module.css';

import logoDesktop from '../../assets/logo-SlimMom.png';
import logoMobile from '../../assets/Logo-mobile.svg';
import logoDesktopDark from '../../assets/logo-SlimMom-DarkTheme.png';
import logoMobileDark from '../../assets/logo-mobile-DarkTheme.png';

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  let currentLogo;
  let logoClass;

  if (isLoggedIn) {
    currentLogo = isDark ? logoDesktopDark : logoDesktop;
    logoClass = styles.logoIcon;
  } else {
    if (isMobile) {
      currentLogo = isDark ? logoMobileDark : logoMobile;
      logoClass = styles.logoIconMobile;
    } else {
      currentLogo = isDark ? logoDesktopDark : logoDesktop;
      logoClass = styles.logoIcon;
    }
  }

  return (
    <Link to="/" className={styles.logoWrapper}>
      <img src={currentLogo} alt="SlimMom Logo" className={logoClass} />
    </Link>
  );
};

export default Logo;
