import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { Category, CategoryBase } from '../../types';

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

export const deleteCategory = createAsyncThunk(
  'app/deleteCategory',
  async (id: string) => {
    void (await api.deleteTransaction(id));
    return (await api.readTransaction(id)) ? null : id;
  }
);
