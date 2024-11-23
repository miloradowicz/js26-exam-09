import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface Props {
  open: boolean;
}

const Loader: FC<Props> = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Loader;
