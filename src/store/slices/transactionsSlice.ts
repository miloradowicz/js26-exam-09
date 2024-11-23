import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../types';
import {
  createTransaction,
  deleteTransaction,
  syncAllTransactions,
  syncTransaction,
  updateTransaction,
} from '../thunks/transactionsThunks';
import { RootState } from '../../app/store';
import dayjs from 'dayjs';

interface State {
  transactions: Transaction[];
  loading: boolean;
  deleteLoading: string[];
  updateLoading: boolean;
  modalOpen: boolean;
  currentId?: string;
}

const initialState: State = {
  transactions: [],
  loading: false,
  deleteLoading: [],
  updateLoading: false,
  modalOpen: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openTransactionModal: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.currentId = payload;
      state.modalOpen = true;
    },
    closeTransactionModal: (state) => {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncAllTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.transactions = payload;
          state.transactions.sort(
            (a, b) =>
              dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          );
        } else {
          state.transactions = [];
        }
      })
      .addCase(syncAllTransactions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTransaction.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        if (payload) {
          state.transactions.push(payload);
          state.transactions.sort(
            (a, b) =>
              dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          );
        }
      })
      .addCase(createTransaction.rejected, (state) => {
        state.updateLoading = false;
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
        state.updateLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

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
        state.updateLoading = false;
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
export const { openTransactionModal, closeTransactionModal } = slice.actions;

export const Selectors = {
  transactions: (state: RootState) => state.transactionsReducer.transactions,
  loading: (state: RootState) => state.transactionsReducer.loading,
  deleteLoading: (state: RootState) => state.transactionsReducer.deleteLoading,
  updateLoading: (state: RootState) => state.transactionsReducer.updateLoading,
  modalOpen: (state: RootState) => state.transactionsReducer.modalOpen,
  currentId: (state: RootState) => state.transactionsReducer.currentId,
};
