import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contacts/operations';
import { selectLoading, selectError, selectContacts } from '../redux/contacts/selectors';

import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';

const Contacts = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Contacts</h2>
      <ContactForm />
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '4px',
          margin: '16px 0' 
        }}>
          Error: {error}
        </div>
      )}
      
      <SearchBox />
      
      {loading && <p>Loading contacts...</p>}
      
      {!loading && contacts.length === 0 && !error && (
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          fontStyle: 'italic',
          margin: '20px 0' 
        }}>
          No contacts found. Add your first contact above!
        </p>
      )}
      
      {!loading && contacts.length > 0 && <ContactList />}
    </div>
  );
};

export default Contacts;
