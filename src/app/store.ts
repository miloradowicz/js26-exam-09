import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/slices/categoriesSlice';
import { transactionsReducer } from '../store/slices/transactionsSlice';

export const store = configureStore({
  reducer: { categoriesReducer, transactionsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
