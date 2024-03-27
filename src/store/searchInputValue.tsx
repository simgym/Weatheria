import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  search: string;
}

const initialSearchState: InitialState = { search: "" };

const searchSlice = createSlice({
  name: "Search",
  initialState: initialSearchState,
  reducers: {
    searchHandler(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    updateSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

const searchReducer = searchSlice.reducer;

export const searchActions = searchSlice.actions;
export default searchReducer;
