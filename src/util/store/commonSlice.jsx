import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: "",
  pathName: "",
  isMobile: false,
  address: null,
  delinquencyAmount: 0,
  isAuthEmail: false,
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
      state.delinquencyAmount = action.payload;
    },
    setisAuthEmail: (state, action) => {
      console.log(action.payload);
      state.isAuthEmail = action.payload;
    },
  },
});

export const {
  setisAuthEmail,
  setAllPopupOff,
  setLogin,
  setPathName,
  setMobile,
  setaddress,
  setDelinquencyAmount,
} = todoSlice.actions;

export default todoSlice.reducer;
