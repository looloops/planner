import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import widgetState from "../reducers/WidgetsReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, PersistConfig } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
// import { UserState } from "../reducers/userReducer";
// import { WidgetsState } from "../reducers/WidgetsReducer";
import { State } from "../reducers/userReducer";

// Define the RootState interface here

// Persist configuration
const persistConfig: PersistConfig<State> = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  widgets: widgetState,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig as any, rootReducer as any);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Define the RootState type using the store's state
export type RootState = ReturnType<typeof store.getState>;

// Create persistor
export const persistor = persistStore(store);
