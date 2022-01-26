import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: "",
  pathName: "",
  isMobile: false,
};

export const todoSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAllPopupOff: (state, action) => {},

    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    setMobile: (state, action) => {
      console.log(action.payload);
      state.isMobile = action.payload;
    },

    setPathName: (state, action) => {
      state.pathname = action.payload;
    },
  },
});

export const { setAllPopupOff, setMobile, setLogin, setPathName } =
  todoSlice.actions;

export default todoSlice.reducer;
