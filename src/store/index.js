import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import searchSlice from "../features/searchSlice";
import chatSlice from "../features/chatSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";

const reducers = combineReducers({
  user: userSlice,
  search: searchSlice,
  chat: chatSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export const presistor = persistStore(store);

// export const clearState = () => presistor.purge();

export default store;
