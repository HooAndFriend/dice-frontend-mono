// ** Redux Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./app/auth";
import workspace from "./app/workspace";

// ** Middleware Imports
import { middleware } from "./middleware";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
};

const reducer = combineReducers({
  auth,
  workspace,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
