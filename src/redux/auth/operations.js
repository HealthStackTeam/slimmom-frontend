import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://slimmom-backend-h150.onrender.com'; // Buraya render linki gelicek
axios.defaults.withCredentials = true;
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data: res } = await axios.post('/auth/register', credentials); // Buraya end point gelicek
      if (res.data.accessToken) setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data: res } = await axios.post('/auth/login', credentials); // Buraya end point gelicek
      if (res.data.accessToken) setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const logout = createAsyncThunk(
  'auth/logout',
  async (__dirname, thunkAPI) => {
    try {
      await axios.post('/auth/logout'); // Buraya end point gelicek
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (token) {
      setAuthHeader(token);
    } else {
      clearAuthHeader(); // token yoksa header'ı temizle, cookie ile backend'e gitsin
    }
    try {
      setAuthHeader(token);
      const { data: res } = await axios.get('/auth/refresh');
      if (res.data.accessToken) setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
