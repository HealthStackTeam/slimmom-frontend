import { createSlice } from "@reduxjs/toolkit";
import {fetchDiary,addProduct, deleteProduct } from "./operations";

const initialState = {
  products: [],
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch diary entries
      .addCase(fetchDiary.fulfilled, (state, action) => {
        // backend: { data: [...] } 
        console.log(action.payload);
        state.products = action.payload.data;
      })
      // add product to diary
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
      })
      // delete product from diary
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default diarySlice.reducer;