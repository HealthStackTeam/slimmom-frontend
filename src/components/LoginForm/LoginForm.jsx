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
    <div className={css.loginForm}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label className={css.loginLabel} htmlFor="email">
            Email
          </label>
          <Field type="email" name="email" id={emailFieldId} />
          <label className={css.loginLabel} htmlFor="password">
            Password
          </label>
          <Field
            type="password"
            name="password"
            id={passwordFieldId}
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
