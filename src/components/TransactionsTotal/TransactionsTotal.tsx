import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Selectors } from '../../store/slices/transactionsSlice';

const TransactionsTotal = () => {
  const transactions = useAppSelector(Selectors.transactions);

  const value = transactions.reduce((a, x) => a + x.amount, 0);

  return (
    <Stack direction='row'>
      <Typography variant='h5' marginRight={2}>
        Total:
      </Typography>
      <Typography
        variant='h5'
        color={value === 0 ? 'textPrimary' : value > 0 ? 'success' : 'error'}
      >
        {value} KGS
      </Typography>
    </Stack>
  );
};

export default TransactionsTotal;
