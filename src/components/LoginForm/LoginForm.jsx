import css from './LoginForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const Schema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const dispatch = useDispatch();
  const passwordFieldId = useId();
  const emailFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
      })
      .catch(() => {
        toast.error(
          'Login failed. Please check your credentials and try again.',
        );
      });

    actions.resetForm();
  };

  return (
    <div className={css.loginFormContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label className={css.loginLabel} htmlFor="email">
              Email
            </label>
            <Field type="email" name="email" id={emailFieldId} />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>
          <div className={css.inputContainer}>
            <label className={css.loginLabel} htmlFor="password">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id={passwordFieldId}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>

          <div>
            <button type="submit">Log in</button>
            <NavLink to="/register">Register</NavLink>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
