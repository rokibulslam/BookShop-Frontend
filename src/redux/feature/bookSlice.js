import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchString: "",
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        }
    }
});

export const { setSearchString } = bookSlice.actions;
export default bookSlice.reducer;
