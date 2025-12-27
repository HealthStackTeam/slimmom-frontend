import css from './RegistrationForm.module.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/operations'

const RegistrationForm = () => {

  const dispatch = useDispatch();

  const Schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className={css.registerForm}>
      <h1>Registration</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            dispatch(register({
              name: values.name.trim(),
              email: values.email.trim(),
              password: values.password,
            }))
          } catch (error) {
            console.error('Registration error:', error);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        <Form className={css.form}>
          <label className={css.registerLabel} htmlFor="name">
            Name *
          </label>
          <Field type="text" name="name" placeholder="Name" />
          <label className={css.registerLabel} htmlFor="email">
            Email *
          </label>
          <Field type="email" name="email" placeholder="Email" />
          <label className={css.registerLabel} htmlFor="password">
            Password *
          </label>
          <Field type="password" name="password" placeholder="Password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>

    </div>
  )
}

export default RegistrationForm
