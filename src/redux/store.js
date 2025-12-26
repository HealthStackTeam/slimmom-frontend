import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import dailyRateReducer from "./dailyRate/slice";
import diaryReducer from "./diary/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyRate: dailyRateReducer,
    diary: diaryReducer,
  },
});
