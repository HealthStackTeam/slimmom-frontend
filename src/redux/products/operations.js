import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// export const fetchProducts = createAsyncThunk(
//   "products/fetch",
//     async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get("/products");
//       return data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

export const fetchProductsByQuery = createAsyncThunk(
    "products/fetchByQuery",
    async (query, thunkAPI) => {
        try {
            setAuthHeader(thunkAPI.getState().auth.token);
            const { data } = await axios.get(`/products?search=${query}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);