import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Sorry, the page you are looking for could not be found.</p>
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;