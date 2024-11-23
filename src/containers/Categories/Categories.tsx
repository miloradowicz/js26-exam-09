import {
  Button,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import Loader from '../../components/UI/Loader/Loader';
import {
  clearError,
  openCategoryModal,
  Selectors,
} from '../../store/slices/categoriesSlice';
import { SyntheticEvent, useEffect } from 'react';
import { syncAllCategories } from '../../store/thunks/categoriesThunks';

const Categories = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(Selectors.error);
  const categoriesLoading = useAppSelector(Selectors.loading);

  useEffect(() => {
    dispatch(syncAllCategories());
  }, [dispatch]);

  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(clearError());
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4'>Categories</Typography>
        <Button onClick={() => dispatch(openCategoryModal())}>Add</Button>
      </Stack>
      <CategoriesList />
      <Snackbar
        open={error ? true : false}
        autoHideDuration={5000}
        onClose={handleClose}
        message={error}
      />
      <Loader open={categoriesLoading} />
    </>
  );
};

export default Categories;
