import { FC, memo } from 'react';
import { Category } from '../../../types';
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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  openCategoryModal,
  Selectors,
} from '../../../store/slices/categoriesSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { deleteCategory } from '../../../store/thunks/categoriesThunks';

interface Props {
  category: Category;
}

const CategoriesListItem: FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();

  const deleteLoading = useAppSelector(Selectors.deleteLoading);

  const handleEdit = () => {
    dispatch(openCategoryModal(category.id));
  };

  const handleDelete = () => {
    dispatch(deleteCategory(category.id));
  };

  return (
    category && (
      <Card sx={{ px: 1 }} variant='outlined'>
        <Stack direction='row' justifyContent='space-between'>
          <Box flex={1}>
            <CardContent>
              <Grid container>
                <Grid size={10}>
                  <Typography>{category.name}</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography
                    color={category.type === 'expense' ? 'red' : 'green'}
                  >
                    {category.type}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
          <Stack direction='row'>
            <CardActions>
              <Button onClick={handleEdit}>
                <EditIcon />
              </Button>
              <LoadingButton
                loading={deleteLoading.includes(category.id)}
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

export default memo(CategoriesListItem);
