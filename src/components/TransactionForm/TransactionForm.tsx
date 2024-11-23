import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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

type Data = TransactionBase;

const initialData: Data = {
  categoryId: '',
  amount: 0,
  createdAt: '',
};

const TransactionForm = () => {
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
        setData(_data);
      }
    }
  }, [currentId, transactions]);

  const validate = (data: Data) =>
    !!(data.amount && categories.find((x) => x.id === data.categoryId));

  const handleClose = () => {
    dispatch(closeTransactionModal());
  };

  const handleChange = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      if (currentId) {
        await dispatch(
          updateTransaction({
            id: currentId,
            transaction: { ...data },
          })
        );
      } else {
        await dispatch(
          createTransaction({ ...data, createdAt: dayjs().toISOString() })
        );
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
          <Select
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
          </Select>
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
