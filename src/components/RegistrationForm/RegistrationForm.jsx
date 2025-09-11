import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import styles from '../LoginForm/LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'En az 2 karakter').required('İsim zorunlu'),
  email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
  password: Yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">İsim</label>
          <Field
            id="name"
            name="name"
            className={styles.inputField}
            autoComplete="name"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label className={styles.label} htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            className={styles.inputField}
            autoComplete="username"
          />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label className={styles.label} htmlFor="password">Şifre</label>
          <Field
            id="password"
            name="password"
            type="password"
            className={styles.inputField}
            autoComplete="new-password"
          />
          <ErrorMessage name="password" component="div" className={styles.error} />
        </div>
       
        {error && (
          <div className={styles.error}>
            {typeof error === "object"
              ? error.code === 11000
                ? "This email is already registered!"
                : JSON.stringify(error)
              : error === "Email in use"
                ? "This email is already registered!"
                : error}
          </div>
        )}
        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;