import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, PersistConfig } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "../reducers/rootReducer"; // Make sure this is correct

// Define RootState based on the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Persist configuration
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);
