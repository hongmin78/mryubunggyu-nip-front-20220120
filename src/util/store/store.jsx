import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

const reducer = combineReducers({ common: commonSlice });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}
