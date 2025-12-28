import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsByQuery } from "./operations";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByQuery.fulfilled, (state, action) => {
                state.items = action.payload;
            })
    },
});

const productsReducer = productsSlice.reducer;

export default productsReducer;