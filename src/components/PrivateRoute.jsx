import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ redirectTo = "/login", component }) => {
  // DEBUG: Her zaman giriş yapılmış gibi yap
  const isLoggedIn = true
  
  return isLoggedIn ? component : <Navigate to={redirectTo} />
}

export default PrivateRoute