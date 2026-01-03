import css from './LoginForm.module.css';
import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { getDailyRate } from '../../redux/dailyRate/operations';
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
        dispatch(getDailyRate());
        localStorage.removeItem('calcData');
      })

      .catch((error) => {
        let status = error?.status;
        if (!status && typeof error === 'string') {
          try {
            const parsed = JSON.parse(error);
            status = parsed.status;
          } catch { 
            console.error('Error parsing error string as JSON:', error);
          }
        }
        if (!status && error?.response?.status) {
          status = error.response.status;
        }
        if (status === 404) {
          toast.error('No account found with this email address.');
        } else if (status === 401) {
          toast.error('Incorrect password. Please try again.');
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(
            'Login failed. Please check your credentials and try again.',
          );
        }
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
          <h2>Log in</h2>
          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.loginLabel} htmlFor="email">
                <span>Email *</span><ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </label>
              <Field type="email" name="email" id={emailFieldId} />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>
          </div>
          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.loginLabel} htmlFor="password">
                <span>Password *</span>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </label>
              <span className={css.passwordVisibilityToggle} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? '🙈' : '🐵'}
              </span>
              <Field type={isPasswordVisible ? 'text' : 'password'} name="password" id={passwordFieldId} />
            </div>

            <div className={css.errorContainer}>
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>
          </div>

          <div className={css.btnContainer}>
            <button className={css.loginBtn} type="submit">
              Log in
            </button>
            <NavLink to="/register">Register</NavLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
