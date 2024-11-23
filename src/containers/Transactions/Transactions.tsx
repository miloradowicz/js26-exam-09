import { Typography } from '@mui/material';
import Loader from '../../components/UI/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Selectors as transactionsSelector } from '../../store/slices/transactionsSlice';
import { useEffect } from 'react';
import { syncAllTransactions } from '../../store/thunks/transactionsThunks';
import { Selectors as categoriesSelector } from '../../store/slices/categoriesSlice';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import TransactionsTotal from '../../components/TransactionsTotal/TransactionsTotal';

const Transactions = () => {
  const dispatch = useAppDispatch();

  const transactionsLoading = useAppSelector(transactionsSelector.loading);
  const categoriesLoading = useAppSelector(categoriesSelector.loading);

  useEffect(() => {
    dispatch(syncAllTransactions());
  }, [dispatch]);
  return (
    <>
      <Typography variant='h4'>Transactions</Typography>
      <TransactionsTotal />
      <TransactionsList />
      <Loader open={transactionsLoading || categoriesLoading} />
    </>
  );
};

export default Transactions;
