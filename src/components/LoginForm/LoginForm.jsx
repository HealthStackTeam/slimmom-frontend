
import css from './LoginForm.module.css'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/operations'

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <div className={css.loginForm}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async(values, { setSubmitting, resetForm }) => {
          try {
            await dispatch(login({
              email: values.email.trim(),
              password: values.password,
            }));
            setSubmitting(false);
            resetForm();
          } catch (error) {
            console.error('Login error:', error);
          }
        }}
      >
        <Form>
          <label className={css.loginLabel} htmlFor="email">
            Email
          </label>
          <input type="email" name="email" placeholder="Email" />
          <label className={css.loginLabel} htmlFor="password">
            Password
          </label>
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
