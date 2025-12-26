import { createSlice } from "@reduxjs/toolkit";
import { fetchDiary, addProduct, deleteProduct } from "./operations";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch diary entries
      .addCase(fetchDiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiary.fulfilled, (state, action) => {
        state.isLoading = false;
        // backend: { data: [...] } 
        state.products = action.payload.data;
      })
      .addCase(fetchDiary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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