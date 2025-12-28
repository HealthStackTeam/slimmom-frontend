import Logo from "../Logo/Logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const Header = () => {
  const  isLoggedIn  = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Logo />

          <div className={styles.desktopNav}>
            <Navigation isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <div className={styles.rightSide}>{isLoggedIn && <UserInfo />}</div>
      </div>
    </header>
  );
};

export default Header;
