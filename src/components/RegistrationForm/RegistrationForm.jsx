import css from './RegistrationForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { register } from '../../redux/auth/operations';
import { fetchDailyRateUser } from '../../redux/dailyRate/operations';
import { useState } from 'react';
import { CiRead, CiUnread } from 'react-icons/ci';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!');

        // kayıt başarılıysa, varsa bekleyen hesaplama verisini alıp işle
        const storedCalcData = localStorage.getItem('calcData');

        if (storedCalcData) {
          const calcData = JSON.parse(storedCalcData);
          // kullanıcı adına kaloriyi kaydet
          dispatch(fetchDailyRateUser(calcData));
          // işlem bitince temizle
          localStorage.removeItem('calcData');
        }
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
        if (status === 409) {
          toast.error('This email is already registered.');
        } else if (status === 400) {
          toast.error(
            'Invalid registration data. Please check your information.',
          );
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      });
    actions.resetForm();
  };

  const Schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={css.registerFormContainer}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <h2>Register</h2>

          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.registerLabel} htmlFor="name">
                <span>Name *</span>
                <ErrorMessage name="name" component="div" className={css.error} />
              </label>
              <Field type="text" name="name" />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
          </div>

          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.registerLabel} htmlFor="email">
                <span>Email *</span>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </label>
              <Field type="email" name="email" />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.registerLabel} htmlFor="password">
                <span>   Password *</span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </label>
               <span className={css.passwordVisibilityToggle} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                              {isPasswordVisible ? <CiRead /> : <CiUnread />}
                            </span>
              <Field type={isPasswordVisible ? 'text' : 'password' } name="password" />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <div className={css.btnContainer}>
            <button className={css.registerBtn} type="submit">
              Register
            </button>
            <NavLink to="/login">Log in</NavLink>
          </div>
        </Form>
      </Formik>
      {/* @yesimbozkurt */}
    </div>
  );
};

export default RegistrationForm;
