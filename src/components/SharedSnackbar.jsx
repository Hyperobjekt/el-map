import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { defaultSnackbarSetting, useSnackbarContext } from '../contexts';

const SharedSnackbar = () => {
  const { open, message, type, setSnackbar } = useSnackbarContext();

  const onClose = () => setSnackbar(defaultSnackbarSetting);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      action={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      <Alert onClose={onClose} severity={type || 'success'}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SharedSnackbar;
