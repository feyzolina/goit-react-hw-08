
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', border: '1px solid #ccc', marginBottom: '8px' }}>
      <div>
        <span style={{ marginRight: '16px', fontWeight: 'bold' }}>{contact.name}</span>
        <span>{contact.number}</span>
      </div>
      <button 
        onClick={handleDelete}
        style={{ 
          backgroundColor: '#ff4444', 
          color: 'white', 
          border: 'none', 
          padding: '4px 8px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
