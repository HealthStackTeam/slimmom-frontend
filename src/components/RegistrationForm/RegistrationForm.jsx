import css from './RegistrationForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/operations'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const RegistrationForm = () => {

  const dispatch = useDispatch();

  const handleSubmit = (values,actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!')
      })
      .catch(() => {
        toast.error('Registration failed. Please try again.')
      });
    actions.resetForm()
  }

  const Schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className={css.registerFormContainer}>
      
      <Formik
        initialValues={{ name: '', email: '', password: ''}}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <h2>Register</h2>
          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.registerLabel} htmlFor="name">
                Name *
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
                Email *
              </label>
              <Field type="email" name="email" />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>
          </div>

          <div className={css.inputContainer}>
            <div className={css.input}>
              <label className={css.registerLabel} htmlFor="password">
                Password *
              </label>
              <Field type="password" name="password" />
            </div>
            <div className={css.errorContainer}>
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>
          </div>

          <div className={css.btnContainer}>
            <button className={css.registerBtn} type="submit">Register</button>
            <NavLink to="/login">Log in</NavLink>
          </div>

        </Form>
      </Formik>
      {/* @yesimbozkurt */}
    </div>
  )
}

export default RegistrationForm
