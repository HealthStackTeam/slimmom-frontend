import css from './LoginForm.module.css'
import { Formik, Form,Field } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/operations'
import {useId} from "react"

const LoginForm = () => {
  const dispatch = useDispatch();
  const passwordFieldId = useId();
  const emailFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
    
    actions.resetForm()
  }

  return (
    <div className={css.loginForm}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form >
          <label className={css.loginLabel} htmlFor="email">
            Email
          </label>
         <Field type="email" name="email" id={emailFieldId} />
          <label className={css.loginLabel} htmlFor="password">
            Password
          </label>
          <Field type="password" name="password" id={passwordFieldId} placeholder="Password" />
          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
