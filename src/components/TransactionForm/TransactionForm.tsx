import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeTransactionModal,
  Selectors,
} from '../../store/slices/transactionsSlice';
import { Selectors as categorySelector } from '../../store/slices/categoriesSlice';
import {
  createTransaction,
  updateTransaction,
} from '../../store/thunks/transactionsThunks';
import dayjs from 'dayjs';
import { TransactionBase } from '../../types';
import { useNavigate } from 'react-router-dom';

type Data = TransactionBase;

const initialData: Data = {
  categoryId: '',
  amount: 0,
  createdAt: '',
};

const TransactionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentId = useAppSelector(Selectors.currentId);
  const transactions = useAppSelector(Selectors.transactions);
  const categories = useAppSelector(categorySelector.categories);
  const updateLoading = useAppSelector(Selectors.updateLoading);
  const [data, setData] = useState<Data>(initialData);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (currentId) {
      const i = transactions.find((x) => x.id === currentId);

      if (i) {
        const { id: _, ..._data } = { ...i };
        setData({ ..._data, amount: Math.abs(_data.amount) });
      }
    }
  }, [currentId, transactions]);

  const validate = (data: Data) =>
    !!(
      Number.isInteger(data.amount) &&
      data.amount > 0 &&
      categories.find((x) => x.id === data.categoryId)
    );

  const handleClose = () => {
    dispatch(closeTransactionModal());
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const _data = {
      ...data,
      [e.target.name]:
        e.target.name === 'amount'
          ? Number.parseInt(e.target.value)
          : e.target.value,
    };
    setData(_data);
    setDisabled(!validate(_data));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate(data)) {
      const c = categories.find((x) => x.id === data.categoryId);

      if (currentId) {
        await dispatch(
          updateTransaction({
            id: currentId,
            transaction: {
              ...data,
              amount: c?.type === 'expense' ? -data.amount : data.amount,
            },
          })
        );
      } else {
        await dispatch(
          createTransaction({
            ...data,
            amount: c?.type === 'expense' ? -data.amount : data.amount,
            createdAt: dayjs().toISOString(),
          })
        );

        navigate('/');
      }
    }

    handleClose();
  };

  return (
    <Stack gap={2}>
      <Typography variant='h5'>
        {currentId ? 'Edit transaction' : 'New transaction'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            select
            name='categoryId'
            value={data.categoryId}
            label='Category'
            onChange={handleChange}
          >
            {categories.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name='amount'
            value={data.amount}
            label='Amount'
            onChange={handleChange}
          />
          <LoadingButton
            type='submit'
            disabled={disabled}
            loading={updateLoading}
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
      <Button onClick={handleClose}>Close</Button>
    </Stack>
  );
};

export default TransactionForm;
