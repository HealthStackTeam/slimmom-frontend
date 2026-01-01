import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const fetchDailyRate = createAsyncThunk(
  "dailyRate/fetch",
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post("/calories/public", values);
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDailyRateUser = createAsyncThunk(
  "dailyRate/fetchUser",
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

export const getDailyRate = createAsyncThunk(
  "dailyRate/getUserData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const { data } = await axios.get("/calories/private");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);