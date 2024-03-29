import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import cityReducer from "./citySlice";

const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
