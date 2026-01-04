import { Link } from "react-router-dom";
import logoDesktop from "../../assets/logo-SlimMom.png";
import logoMobile from '../../assets/Logo-mobile.svg';
import styles from "./Logo.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useMediaQuery } from "react-responsive";

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <Link to="/" className={styles.logoWrapper}>
      <img src={isLoggedIn
        ? logoDesktop
        : (isMobile ? logoMobile : logoDesktop)} alt="SlimMom Logo" className={styles.logoIcon} />
    </Link>
  );
};

export default Logo;
