import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';
import {
  createCategory,
  deleteCategory,
  syncAllCategories,
  syncCategory,
  updateCategory,
} from '../thunks/categoriesThunks';

interface State {
  categories: Category[];
  loading: boolean;
  deleteLoading: string[];
}

const initialState: State = {
  categories: [],
  loading: false,
  deleteLoading: [],
};

const appSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.categories = payload;
        } else {
          state.categories = [];
        }
      })
      .addCase(syncAllCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.categories.push(payload);
        }
      })
      .addCase(createCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(syncCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncCategory.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.categories.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.categories.splice(i, 1, payload);
          } else {
            state.categories.push(payload);
          }
        }
      })
      .addCase(syncCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.categories.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.categories.splice(i, 1, payload);
          } else {
            state.categories.push(payload);
          }
        }
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.deleteLoading.push(meta.arg);
        }
      })
      .addCase(deleteCategory.fulfilled, (state, { meta, payload }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }

        if (payload) {
          const i = state.categories.findIndex((x) => x.id === payload);

          if (i >= 0) {
            state.categories.splice(i, 1);
          }
        }
      })
      .addCase(deleteCategory.rejected, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }
      });
  },
});

export const categoriesReducer = appSlice.reducer;
