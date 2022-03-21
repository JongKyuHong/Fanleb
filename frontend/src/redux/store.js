import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// 모든 reducer 모음
export default configureStore({
  reducer: {
    user: userReducer,
  },
});