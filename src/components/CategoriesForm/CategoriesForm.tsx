import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeCategoryModal,
  Selectors,
} from '../../store/slices/categoriesSlice';
import { CategoryBase } from '../../types';
import { MenuItem, TextField, Button, Stack, Typography } from '@mui/material';
import {
  createCategory,
  updateCategory,
} from '../../store/thunks/categoriesThunks';
import { LoadingButton } from '@mui/lab';

type Data = CategoryBase;

const initialData: Data = {
  type: 'expense',
  name: '',
};

const CategoriesForm = () => {
  const dispatch = useAppDispatch();

  const currentId = useAppSelector(Selectors.currentId);
  const categories = useAppSelector(Selectors.categories);
  const updateLoading = useAppSelector(Selectors.updateLoading);
  const [data, setData] = useState<Data>(initialData);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (currentId) {
      const i = categories.find((x) => x.id === currentId);

      if (i) {
        const { id: _, ..._data } = { ...i };
        setData(_data);
      }
    }
  }, [currentId, categories]);

  const validate = (data: Data) => !!(data.name && data.type);

  const handleClose = () => {
    dispatch(closeCategoryModal());
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const _data = { ...data, [e.target.name]: e.target.value };
    setData(_data);
    setDisabled(!validate(_data));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate(data)) {
      if (currentId) {
        await dispatch(updateCategory({ id: currentId, category: data }));
      } else {
        await dispatch(createCategory(data));
      }
    }

    handleClose();
  };

  return (
    <Stack gap={2}>
      <Typography variant='h5'>
        {currentId ? 'Edit category' : 'New category'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            select
            id='category-type-select'
            name='type'
            value={data.type}
            label='Type'
            onChange={handleChange}
            required
          >
            <MenuItem value='expense'>Expense</MenuItem>
            <MenuItem value='income'>Income</MenuItem>
          </TextField>
          <TextField
            name='name'
            value={data.name}
            label='Name'
            onChange={handleChange}
            required
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

export default CategoriesForm;
