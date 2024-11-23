import { Modal, Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  open: boolean;
  onClose?: (_: Event, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

const UIModal: FC<PropsWithChildren<Props>> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 100,
          bottom: 100,
          left: '50%',
          transform: 'translate(-50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          px: 4,
          py: 8,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default UIModal;
