import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { TransactionBase, Transaction } from '../../types';

export const syncAllTransactions = createAsyncThunk(
  'app/syncAllTransactions',
  api.readAllTransactions
);

export const createTransaction = createAsyncThunk(
  'app/createTransaction',
  async (transaction: TransactionBase) => {
    const id = await api.createTransaction(transaction);
    return await api.readTransaction(id);
  }
);

export const syncTransaction = createAsyncThunk(
  'app/syncTransaction',
  api.readTransaction
);

export const updateTransaction = createAsyncThunk(
  'app/updateTransaction',
  async ({
    id,
    transaction,
  }: {
    id: string;
    transaction: TransactionBase;
  }): Promise<Transaction | null> => {
    void (await api.updateTransaction(id, transaction));
    return await api.readTransaction(id);
  }
);

export const deleteTransaction = createAsyncThunk(
  'app/deleteTransaction',
  async (id: string) => {
    void (await api.deleteTransaction(id));
    return (await api.readTransaction(id)) ? null : id;
  }
);
