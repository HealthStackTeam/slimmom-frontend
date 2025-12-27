
import css from './LoginForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/operations'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const LoginForm = () => {
  const Schema = Yup.object().shape({ email: Yup.string().trim().email('Please enter a valid email').required('Email is required'), password: Yup.string().required('Password is required'), });

  const dispatch = useDispatch();
  return (
    <div className={css.loginForm}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Schema}
        onSubmit={async(values, { setSubmitting, resetForm }) => {
          try {
            await dispatch(login({
              email: values.email.trim(),
              password: values.password,
            }));
            toast.success('Login successful!')
            resetForm();
          } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className={css.form}>
          <h2>log in</h2>
          {/* <label className={css.loginLabel} htmlFor="email">
            Email
          </label> */}
          <Field type="email" name="email" placeholder="Email *" />
          <ErrorMessage name="email" component="div" className={css.error} />
          {/* <label className={css.loginLabel} htmlFor="password">
            Password
          </label> */}
          <Field type="password" name="password" placeholder="Password *" />
          <ErrorMessage name="password" component="div" className={css.error} />
          <div className={css.btnContainer}>
            <button type="submit">Log in</button>
            <NavLink to="/register">Register</NavLink>
        </div>
          
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
