import Header from '../components/Header/Header';
import LoginForm from '../components/LoginForm/LoginForm';
import styles from './CommonPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles['page-container']}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
