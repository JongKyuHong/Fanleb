import { createSlice } from "@reduxjs/toolkit";

// 네비게이션바의 유저 프로필 사진을 바꿔주는 reducer, state 
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      url: "https://cdn2.thecatapi.com/images/civ.jpg",
      account: ""
    },
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.url = action.payload;
      state.userInfo.account = action.payload;
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateFailure } = userSlice.actions;
export default userSlice.reducer;