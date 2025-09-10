
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts, selectLoading } from "../../redux/contacts/selectors";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    number: Yup.string()
      .matches(/^[0-9-+\s()]+$/, 'Please enter a valid phone number')
      .min(5, 'Phone number must be at least 5 characters')
      .required('Phone number is required'),
  });

  const handleSubmit = (values, { resetForm, setFieldError }) => {
    // Check for duplicate names
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      setFieldError('name', 'Contact with this name already exists');
      return;
    }

    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        maxWidth: '400px',
        marginBottom: '20px'
      }}>
        <div>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
          <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '14px' }} />
        </div>
        
        <div>
          <Field
            type="tel"
            name="number"
            placeholder="Phone number"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
          <ErrorMessage name="number" component="div" style={{ color: 'red', fontSize: '14px' }} />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
