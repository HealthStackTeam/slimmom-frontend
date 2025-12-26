import React from 'react'
import css from './LoginForm.module.css'
import { Formik, Form } from 'formik'
const LoginForm = () => {
  return (
    <div className={css.loginForm}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Handle form submission
          setSubmitting(false)
          resetForm()
        }}
      >
        <Form>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
