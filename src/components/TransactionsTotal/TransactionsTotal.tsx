import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Selectors } from '../../store/slices/transactionsSlice';
import { Selectors as categoriesSelector } from '../../store/slices/categoriesSlice';

const TransactionsTotal = () => {
  const transactions = useAppSelector(Selectors.transactions);
  const categories = useAppSelector(categoriesSelector.categories);

  return (
    <Stack direction='row'>
      <Typography variant='h5' marginRight={2}>
        Total:
      </Typography>
      <Typography variant='h5'>
        {transactions.reduce((a, x) => {
          const c = categories.find((y) => x.categoryId === y.id);

          if (c) {
            return c.type === 'income' ? a + x.amount : a - x.amount;
          } else {
            return a;
          }
        }, 0)}
      </Typography>
    </Stack>
  );
};

export default TransactionsTotal;
