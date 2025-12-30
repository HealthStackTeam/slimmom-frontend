import { useDispatch, useSelector } from "react-redux";
import styles from "./UserInfo.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <span className={styles.name}>{user.name}</span>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Exit
      </button>
    </div>
  );
};

export default UserInfo;
