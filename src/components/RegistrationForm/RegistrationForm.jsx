import React from 'react'
import css from './RegistrationForm.module.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

const RegistrationForm = () => {

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  
  const Schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className={css.registerForm}>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={Schema} 
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Handle form submission
          setSubmitting(false)
          resetForm()
        }}
      >
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
      
    </div>
  )
}

export default RegistrationForm
