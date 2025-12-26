import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch diary entries
export const fetchDiary = createAsyncThunk(
  "diary/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/diary");
      return data; 
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
      // productData: { date, productId, weight }
      const { data } = await axios.post("/diary", productData);
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
      await axios.delete("/diary", { data: { dailyId } });
      return dailyId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);