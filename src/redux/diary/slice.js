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
        state.products = action.payload;
      })
      // add product to diary
      .addCase(addProduct.fulfilled, (state, action) => {
        for (const prod of state.products) {
          if (prod.product._id === action.payload.data.product._id) {
            prod.weight = action.payload.data.weight;
            return;
          }
        }
        state.products.push(action.payload.data); 
      })
      // delete product from diary
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const index = state.products.indexOf(action.payload);
        state.products.splice(index, 1);
      });
  },
});

export default diarySlice.reducer;