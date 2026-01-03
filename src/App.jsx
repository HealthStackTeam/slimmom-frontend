import { lazy, Suspense, useEffect } from 'react';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import DiaryAddPage from './pages/DiaryAddPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations.js';
import { getDailyRate } from './redux/dailyRate/operations.js';
import { selectIsRefreshing, selectIsLoggedIn } from './redux/auth/selectors';
import Header from './components/Header/Header.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader.jsx';
import Layout from './components/Layout/Layout.jsx';

const MainPage = lazy(() => import('./pages/MainPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //token var mı diye kontrol etmek için state den çekiyoruz
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (isLoggedIn) {
      document.body.classList.add('logged-in');
    } else {
      document.body.classList.remove('logged-in');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // token varsa refresh yoksa direkt if e girmiyor 
    if (token) {
      dispatch(refreshUser()).then((action) => {
        // fullyfilled ve giriş yapılmışsa veriyi çekiyoruz
        if (action.meta.requestStatus === 'fulfilled') {
          dispatch(getDailyRate());
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return isRefreshing ? (
    <strong>
      <Loader />
    </strong>
  ) : (
    <div className="App">
      {/* Navbar Menü gelicek */}
      {/* <Header /> */}
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RestrictedRoute
                redirectTo="/calculator"
                component={<MainPage />}
              />
            }
          />
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
          <Route 
             path="/diary/add" 
             element={
            <PrivateRoute redirectTo="/login" component={<DiaryAddPage />}/>
            } 
              />
            </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;