import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// fetch diary entries
export const fetchDiary = createAsyncThunk(
  "diary/fetch",
  async (credentials, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI.getState().auth.token);
      const { data:res } = await axios.post("/diary",{date:credentials});
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// add product to diary
export const addProduct = createAsyncThunk(
  "diary/addProduct",
  async (productData, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI.getState().auth.token);
      // productData: { date, productId, weight }
      const { data } = await axios.post("/diary/add", productData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete product from diary
export const deleteProduct = createAsyncThunk(
  "diary/deleteProduct",
  async (dailyId, thunkAPI) => {

    try {
      setAuthHeader(thunkAPI.getState().auth.token);
      await axios.delete(`/diary/${dailyId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);