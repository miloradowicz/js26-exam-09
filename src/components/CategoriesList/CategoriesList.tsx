import { Stack } from '@mui/material';
import CategoriesListItem from './CategoriesListItem/CategoriesListItem';
import { useAppSelector } from '../../app/hooks';
import { Selectors } from '../../store/slices/categoriesSlice';

const TransactionsList = () => {
  const categories = useAppSelector(Selectors.categories);

  return (
    <Stack gap={1}>
      {categories.map((x) => (
        <CategoriesListItem key={x.id} category={x} />
      ))}
    </Stack>
  );
};

export default TransactionsList;
