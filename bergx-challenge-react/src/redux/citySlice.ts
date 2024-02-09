import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityType } from "../utils/types";

export type CityState = {
  cities: CityType[];
};

const initialState: CityState = {
  cities: [],
};

export const citySlice = createSlice({
  name: "citySlice",
  initialState,
  reducers: {
    setCities: (state: CityState, action: PayloadAction<CityType[]>): any => {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citySlice.actions;

export default citySlice.reducer;
