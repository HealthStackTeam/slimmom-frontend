import { lazy, Suspense, useEffect } from 'react';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/auth/selectors';
import Header from './components/Header/Header.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader.jsx';

const MainPage = lazy(() => import('./pages/MainPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const persistedAuth = localStorage.getItem('persist:auth');
    let token = null;
    if (persistedAuth) {
      try {
        const authObj = JSON.parse(persistedAuth);
        token = JSON.parse(authObj.token);
      } catch (e) {
        token = null;
        console.log(e); // Geçersiz JSON durumunda hata yakala
      }
    }
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  return isRefreshing ? (
    <strong>
      <Loader />
    </strong>
  ) : (
    <>
      {/* Navbar Menü gelicek */}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/calculator"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/calculator"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<CalculatorPage />}
              />
            }
          />
          <Route
            path="/diary"
            element={
              <PrivateRoute redirectTo="/login" component={<DiaryPage />} />
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
