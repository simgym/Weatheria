import { createSlice, configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchInputValue";

interface InitialState {
  appClassName: string;
}

const initialState: InitialState = { appClassName: "app" };

const classSlice = createSlice({
  name: "appClassName",
  initialState: initialState,
  reducers: {
    rain(state) {
      state.appClassName = "app rain";
    },
    haze(state) {
      state.appClassName = "app haze";
    },
    cloud(state) {
      state.appClassName = "app cloud";
    },
    clear(state) {
      state.appClassName = "app clear";
    },
    mist(state) {
      state.appClassName = "app mist";
    },
  },
});

const store = configureStore({
  reducer: {
    weather: classSlice.reducer,
    searchInput: searchReducer,
  },
});

export const classAction = classSlice.actions;

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
