import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { Category, CategoryBase } from '../../types';
import { RootState } from '../../app/store';
import { deleteTransaction } from './transactionsThunks';

export const syncAllCategories = createAsyncThunk(
  'categories/syncAllCategories',
  api.readAllCategories
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: CategoryBase) => {
    const id = await api.createCategory(category);
    return await api.readCategory(id);
  }
);

export const syncCategory = createAsyncThunk(
  'categories/syncCategory',
  api.readCategory
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({
    id,
    category,
  }: {
    id: string;
    category: CategoryBase;
  }): Promise<Category | null> => {
    void (await api.updateCategory(id, category));
    return await api.readCategory(id);
  }
);

export const deleteCategory = createAsyncThunk.withTypes<{
  state: RootState;
}>()('app/deleteCategory', async (id: string, thunkAPI) => {
  const transactions = thunkAPI.getState().transactionsReducer.transactions;
  if (transactions.some((x) => x.categoryId === id)) {
    throw new Error(
      'Cannot delete category. There are transactions in this category. Assign them to another category first.'
    );
  }

  void (await api.deleteCategory(id));
  return (await api.readCategory(id)) ? null : id;
});
