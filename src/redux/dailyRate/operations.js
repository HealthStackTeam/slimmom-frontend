import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// public
export const fetchDailyRate = createAsyncThunk(
  "dailyRate/fetch",
  async (values, thunkAPI) => {
    try {
      // /calories/public
      // values : weight, height, age, desiredWeight, bloodType 
      const { data } = await axios.post("/calories/public", values);
      return data; // backend response: { data: { calorie: ..., foods: ... } }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// private
export const fetchDailyRateUser = createAsyncThunk(
  "dailyRate/fetchUser",
  async ({ userId, values }, thunkAPI) => {
    try {
      // private endpoint gelicek simdilik public
      const { data } = await axios.post("/calories/public", values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);