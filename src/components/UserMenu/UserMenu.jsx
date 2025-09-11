import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { clearContacts } from '../../redux/contacts/slice';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <span>{user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;