import { Stack } from '@mui/material';
import TransactionsListItem from './TransactionsListItem/TransactionsListItem';
import { useAppSelector } from '../../app/hooks';
import { Selectors } from '../../store/slices/transactionsSlice';

const TransactionsList = () => {
  const transactions = useAppSelector(Selectors.transactions);

  return (
    <Stack gap={1}>
      {transactions.map((x) => (
        <TransactionsListItem key={x.id} transaction={x} />
      ))}
    </Stack>
  );
};

export default TransactionsList;
