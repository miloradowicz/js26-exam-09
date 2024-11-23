import { Stack } from '@mui/material';
import TransactionsListItem from './CategoriesListItem/CategoriesListItem';
import { useAppSelector } from '../../app/hooks';
import { Selectors } from '../../store/slices/categoriesSlice';

const TransactionsList = () => {
  const categories = useAppSelector(Selectors.categories);

  return (
    <Stack>
      {categories.map((x) => (
        <TransactionsListItem category={x} />
      ))}
    </Stack>
  );
};

export default TransactionsList;
