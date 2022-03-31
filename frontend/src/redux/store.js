import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import userReducer from "./userSlice";
import collectionReducer from "./collectionSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: userReducer,
  collection: collectionReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
// });
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// // 모든 reducer 모음
// export default configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
export default store;
