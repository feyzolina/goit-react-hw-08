import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useLocation } from 'react-router-dom';
import styles from '../LoginForm/LoginForm.module.css';

const Navigation = () => {
   const location = useLocation();

  return (
    <nav>
      <NavLink to="/" className={styles.inputField}>Home</NavLink>
      {location.pathname !== "/contacts" && (
        <NavLink to="/contacts" className={styles.inputField}>Contacts</NavLink>
      )}
    </nav>
  );
};

export default Navigation;
