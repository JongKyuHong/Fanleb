import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// // 모든 reducer 모음
// export default configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
export default store;
