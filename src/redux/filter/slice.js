import { createSlice } from "@reduxjs/toolkit";


export const productsSlice = createSlice({
    name: "filters",
    initialState: {
       filter:"",
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        }
    },
});

export const { setFilter } = productsSlice.actions;
export const filterReducer = productsSlice.reducer;