import { FC, memo } from 'react';
import { Transaction } from '../../../types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Selectors as categoriesSelector } from '../../../store/slices/categoriesSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  openTransactionModal,
  Selectors as transactionsSelector,
} from '../../../store/slices/transactionsSlice';
import { deleteTransaction } from '../../../store/thunks/transactionsThunks';

interface Props {
  transaction: Transaction;
}

const TransactionsListItem: FC<Props> = ({ transaction }) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(categoriesSelector.categories);
  const deleteLoading = useAppSelector(transactionsSelector.deleteLoading);

  const category = categories.find((x) => x.id === transaction.categoryId);

  const handleEdit = () => {
    dispatch(openTransactionModal(transaction.id));
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  return (
    category && (
      <Card sx={{ px: 1 }} variant='outlined'>
        <Stack direction='row' justifyContent='space-between'>
          <Box flex={1}>
            <CardContent>
              <Grid container>
                <Grid size={3}>
                  <Typography>
                    {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                  </Typography>
                </Grid>
                <Grid size={7}>
                  <Typography>{category.name}</Typography>
                </Grid>
                <Grid size={2} textAlign='end'>
                  <Typography
                    color={category.type === 'expense' ? 'red' : 'green'}
                  >
                    {transaction.amount} KGS
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
          <Stack direction='column'>
            <CardActions>
              <Button onClick={handleEdit}>
                <EditIcon />
              </Button>
              <LoadingButton
                loading={deleteLoading.includes(transaction.id)}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </LoadingButton>
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    )
  );
};

export default memo(TransactionsListItem);
