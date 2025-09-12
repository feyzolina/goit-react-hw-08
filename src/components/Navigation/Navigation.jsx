import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../LoginForm/LoginForm.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <nav>
      {isLoggedIn ? (
        <span className={styles.inputField} style={{ opacity: 0.6, pointerEvents: 'none', cursor: 'default' }}>
          Home
        </span>
      ) : (
        <NavLink to="/" className={styles.inputField}>Home</NavLink>
      )}
      
      {!isLoggedIn && (
        <NavLink to="/contacts" className={styles.inputField}>Contacts</NavLink>
      )}
      {isLoggedIn && null}
    </nav>
  );
};

export default Navigation;