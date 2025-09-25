import { Link } from 'react-router-dom';
import styles from './NotFounded.module.css';

const NotFounded = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/home" className={styles.homeButton}>
            <i className="fas fa-home me-2"></i>Go to Homepage
          </Link>
          <Link to="/contact" className={styles.contactButton}>
            <i className="fas fa-envelope me-2"></i>Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFounded;