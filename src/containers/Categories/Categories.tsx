import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import Loader from '../../components/UI/Loader/Loader';
import {
  openCategoryModal,
  Selectors,
} from '../../store/slices/categoriesSlice';
import { useEffect } from 'react';
import { syncAllCategories } from '../../store/thunks/categoriesThunks';

const Categories = () => {
  const dispatch = useAppDispatch();

  const categoriesLoading = useAppSelector(Selectors.loading);

  useEffect(() => {
    dispatch(syncAllCategories());
  }, [dispatch]);

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4'>Categories</Typography>
        <Button onClick={() => dispatch(openCategoryModal())}>Add</Button>
      </Stack>
      <CategoriesList />
      <Loader open={categoriesLoading} />
    </>
  );
};

export default Categories;
