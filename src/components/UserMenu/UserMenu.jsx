import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { clearContacts } from '../../redux/contacts/slice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearContacts());
  };

  return (
    <div>
      <p>Welcome, {name}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;