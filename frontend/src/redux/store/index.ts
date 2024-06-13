import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import widgetState from "../reducers/WidgetsReducer";

// Definisci il tipo RootState
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  user: userReducer,
  widgets: widgetState,
});

// Crea il negozio
const store = configureStore({
  reducer: rootReducer,
});

export default store;
