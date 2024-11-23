import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';
import { Container } from '@mui/material';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ p: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;
