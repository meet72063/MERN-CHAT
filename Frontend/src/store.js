import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import userApi from "./services/userApi";
//persist store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers
const reducer = combineReducers({
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [userApi.reducerPath],
};
//persist out store
const persistedReducer = persistReducer(persistConfig, reducer);

//creating the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, userApi.middleware],
});

export default store;
