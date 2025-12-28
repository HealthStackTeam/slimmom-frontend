import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" className={styles.logoWrapper}>
      <img src={logoImg} alt="SlimMom Logo" className={styles.logoIcon} />
    </Link>
  );
};

export default Logo;
