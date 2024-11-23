import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types';
import {
  createCategory,
  deleteCategory,
  syncAllCategories,
  syncCategory,
  updateCategory,
} from '../thunks/categoriesThunks';
import { RootState } from '../../app/store';

interface State {
  categories: Category[];
  loading: boolean;
  updateLoading: boolean;
  deleteLoading: string[];
  modalOpen: boolean;
  currentId?: string;
  error?: string;
}

const initialState: State = {
  categories: [],
  loading: false,
  updateLoading: false,
  deleteLoading: [],
  modalOpen: false,
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    openCategoryModal: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.currentId = payload;
      state.modalOpen = true;
    },
    closeCategoryModal: (state) => {
      state.modalOpen = false;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAllCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(syncAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.categories = payload;
        } else {
          state.categories = [];
        }
      })
      .addCase(syncAllCategories.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.updateLoading = true;
        state.error = undefined;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        if (payload) {
          state.categories.push(payload);
        }
      })
      .addCase(createCategory.rejected, (state, { error }) => {
        state.updateLoading = false;
        state.error = error.message;
      })
      .addCase(syncCategory.pending, (state) => {
        state.loading = true;
        state.error = undefined;
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
      .addCase(syncCategory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
        state.error = undefined;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        if (payload) {
          const i = state.categories.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.categories.splice(i, 1, payload);
          } else {
            state.categories.push(payload);
          }
        }
      })
      .addCase(updateCategory.rejected, (state, { error }) => {
        state.updateLoading = false;
        state.error = error.message;
      })
      .addCase(deleteCategory.pending, (state, { meta }) => {
        state.error = undefined;

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
      .addCase(deleteCategory.rejected, (state, { error, meta }) => {
        state.error = error.message;

        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }
      });
  },
});

export const categoriesReducer = slice.reducer;
export const { openCategoryModal, closeCategoryModal, clearError } =
  slice.actions;

export const Selectors = {
  categories: (state: RootState) => state.categoriesReducer.categories,
  loading: (state: RootState) => state.categoriesReducer.loading,
  deleteLoading: (state: RootState) => state.categoriesReducer.deleteLoading,
  updateLoading: (state: RootState) => state.categoriesReducer.updateLoading,
  modalOpen: (state: RootState) => state.categoriesReducer.modalOpen,
  currentId: (state: RootState) => state.categoriesReducer.currentId,
  error: (state: RootState) => state.categoriesReducer.error,
};
