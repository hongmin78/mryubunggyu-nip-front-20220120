import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: "",
  pathName: "",
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
  },
});

export const { setAllPopupOff, setLogin, setPathName } = todoSlice.actions;

export default todoSlice.reducer;
