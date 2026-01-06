import Header from '../components/Header/Header';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import styles from './CommonPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles['page-container']}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
