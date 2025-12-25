import { lazy, Suspense } from 'react'
import RestrictedRoute from './components/RestrictedRoute'
import PrivateRoute from "./components/PrivateRoute"

import './App.css'
import { Routes,Route } from 'react-router-dom'

const MainPage = lazy(() => import("./pages/MainPage"))
const CalculaterPage = lazy(() => import("./pages/CalculatorPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"))
const DiaryPage = lazy(()=> import("./pages/DiaryPage"))


function App() {

  return (
    <>
      {/* Navbar Menü gelicek */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/register" element={<RestrictedRoute redirectTo="/calculater" component={<RegistrationPage />} />} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/calculater" component={<LoginPage />} />} />
          <Route path="/calculater" element={<PrivateRoute redirectTo="/login" component={<CalculaterPage />} />} />
          <Route path="/diary" element={<PrivateRoute redirectTo="/login" component={<DiaryPage />} />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
