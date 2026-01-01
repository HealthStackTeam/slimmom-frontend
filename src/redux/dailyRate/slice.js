import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyRate, fetchDailyRateUser, getDailyRate } from "./operations";
import { logout, login } from "../auth/operations";

const initialState = {
  dailyRate: null, 
  notAllowedProducts: [],
  isLoading: false,
};

const dailyRateSlice = createSlice({
  name: "dailyRate",
  initialState,
  reducers: {
    clearDailyRate: (state) => {
      state.dailyRate = null;
      state.notAllowedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      })
      
      .addCase(fetchDailyRateUser.fulfilled, (state, action) => {
        state.dailyRate = action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods;
      })

      .addCase(getDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.data.dailyCalorie || action.payload.data.calorie;
        state.notAllowedProducts = action.payload.data.foods || [];
      })

      .addCase(login.fulfilled, (state) => {
        state.dailyRate = null;
        state.notAllowedProducts = [];
      })

      .addCase(logout.fulfilled, (state) => {
        state.dailyRate = null;
        state.notAllowedProducts = [];
      });
  },
});

export const { clearDailyRate } = dailyRateSlice.actions;
export default dailyRateSlice.reducer;