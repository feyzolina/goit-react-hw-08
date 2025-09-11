import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
  password: Yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
});

const LoginForm = () => {
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
    dispatch(logIn(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {isLoading && <p>Giriş yapılıyor...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Email
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
        </label>
        <label>
          Şifre
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
        </label>
        <button type="submit" disabled={isLoading}>Giriş Yap</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
