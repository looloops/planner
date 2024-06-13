import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers";
import widgetState from "../reducers/WidgetsReducer";

// Definisci il tipo RootState
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  mainReducer: mainReducer,
  widgetReducer: widgetState,
});

// Crea il negozio
const store = configureStore({
  reducer: rootReducer,
});

export default store;
