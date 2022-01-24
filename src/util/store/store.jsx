import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({});

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}
