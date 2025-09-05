import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, actions) => {
    const resultAction = await dispatch(register(values));
    if (register.fulfilled.match(resultAction)) {
      setSuccess(true);
      actions.resetForm();
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
        <div className={css.success}>Kayıt başarılı!</div>
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

          <button type="submit" className={css.button}>Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
