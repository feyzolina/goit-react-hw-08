import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { clearContacts } from '../../redux/contacts/slice';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearContacts());
    navigate('/');
  };

  return (
    <div  className={styles.menuRight}>
        <span>Hoşgeldin, {user.name}!</span>
      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;