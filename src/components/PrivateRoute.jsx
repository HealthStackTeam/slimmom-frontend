import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/auth/selectors'

const PrivateRoute = ({ redirectTo = "/login", component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  
  return isLoggedIn ? component : <Navigate to={redirectTo} />
}

export default PrivateRoute