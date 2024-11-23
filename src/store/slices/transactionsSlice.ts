import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../../types';
import {
  createTransaction,
  deleteTransaction,
  syncAllTransactions,
  syncTransaction,
  updateTransaction,
} from '../thunks/transactionsThunks';

interface State {
  transactions: Transaction[];
  loading: boolean;
  deleteLoading: string[];
}

const initialState: State = {
  transactions: [],
  loading: false,
  deleteLoading: [],
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncAllTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.transactions = payload;
        } else {
          state.transactions = [];
        }
      })
      .addCase(syncAllTransactions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.transactions.push(payload);
        }
      })
      .addCase(createTransaction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(syncTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.transactions.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.transactions.splice(i, 1, payload);
          } else {
            state.transactions.push(payload);
          }
        }
      })
      .addCase(syncTransaction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.transactions.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.transactions.splice(i, 1, payload);
          } else {
            state.transactions.push(payload);
          }
        }
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTransaction.pending, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.deleteLoading.push(meta.arg);
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, { meta, payload }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }

        if (payload) {
          const i = state.transactions.findIndex((x) => x.id === payload);

          if (i >= 0) {
            state.transactions.splice(i, 1);
          }
        }
      })
      .addCase(deleteTransaction.rejected, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }
      });
  },
});

export const transactionsReducer = slice.reducer;
