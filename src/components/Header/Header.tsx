import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { openTransactionModal } from '../../store/slices/transactionsSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position='static'>
      <Toolbar component='nav' sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' color='white' sx={{ textDecoration: 'none' }}>
          Finance Tracker
        </Typography>
        <Stack color='white' direction='row' gap={3}>
          <Button color='inherit' onClick={() => navigate('/categories')}>
            Categories
          </Button>
          <Button color='inherit' onClick={() => navigate('/')}>
            Transactions
          </Button>
          <Button
            color='inherit'
            onClick={() => dispatch(openTransactionModal())}
          >
            Add
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
