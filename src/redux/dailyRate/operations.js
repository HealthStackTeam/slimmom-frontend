import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Public
export const fetchDailyRate = createAsyncThunk(
  "dailyRate/fetch",
  async (values, thunkAPI) => {
    try {
      // Backend: /calories/public
      // values: { weight, height, age, desiredWeight, bloodType }
      const { data } = await axios.post("/calories/public", values);
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Private
export const fetchDailyRateUser = createAsyncThunk(
  "dailyRate/fetchUser",
  // userId
  async (values , thunkAPI) => {
    try {
      setAuthHeader(thunkAPI.getState().auth.token);
      const { data } = await axios.post("/calories/private", values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);