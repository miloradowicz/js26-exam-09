import { FC, memo } from 'react';
import { Transaction } from '../../../types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { Selectors as categoriesSelector } from '../../../store/slices/categoriesSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Selectors as transactionsSelector } from '../../../store/slices/transactionsSlice';

interface Props {
  transaction: Transaction;
}

const TransactionsListItem: FC<Props> = ({ transaction }) => {
  const categories = useAppSelector(categoriesSelector.categories);
  const deleteLoading = useAppSelector(transactionsSelector.deleteLoading);

  const category = categories.find((x) => x.id === transaction.id);

  return (
    category && (
      <Card>
        <Grid container>
          <Grid size={10}>
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
                <Grid size={2}>
                  <Typography
                    color={category.type === 'expense' ? 'red' : 'green'}
                  >
                    {transaction.amount}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          <Grid size={2}>
            <CardActions>
              <Stack direction='column'>
                <Button>
                  <EditIcon />
                </Button>
                <LoadingButton loading={deleteLoading.includes(transaction.id)}>
                  <DeleteIcon />
                </LoadingButton>
              </Stack>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default memo(TransactionsListItem);
