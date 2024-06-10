import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Importa il reducer principale

// Crea il negozio
const store = configureStore({
  reducer: rootReducer,
});

// Definisci il tipo RootState
export type RootState = ReturnType<typeof store.getState>;

export default store;
