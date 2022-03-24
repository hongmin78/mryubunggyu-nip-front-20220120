import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: "",
  pathName: "",
  isMobile: false,
  address: null,
  delinquencyAmount: 0,
};

export const todoSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAllPopupOff: (state, action) => {},

    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setPathName: (state, action) => {
      state.pathname = action.payload;
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setaddress: (state, action) => {
      state.address = action.payload;
    },
    setDelinquencyAmount: (state, action) => {
      console.log(action.payload);
      state.delinquencyAmount = action.payload;
    },
  },
});

export const {
  setAllPopupOff,
  setLogin,
  setPathName,
  setMobile,
  setaddress,
  setDelinquencyAmount,
} = todoSlice.actions;

export default todoSlice.reducer;
