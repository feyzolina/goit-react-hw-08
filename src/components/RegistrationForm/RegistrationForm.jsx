import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoading, selectAuthError } from '../../redux/auth/selectors';
import { clearError } from '../../redux/auth/slice';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    const resultAction = await dispatch(register(values));
    if (register.fulfilled.match(resultAction)) {
      setSuccess(true);
      actions.resetForm();
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).required('Required'),
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(6).required('Required'),
  });

  return (
    <div>
      {success && (
        <div className={css.success}>Registration successful!</div>
      )}
      
      {error && (
        <div style={{
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          Registration failed: {error}
        </div>
      )}
      
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label>
            Name
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label>
            Email
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>

          <button 
            type="submit" 
            className={css.button}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
