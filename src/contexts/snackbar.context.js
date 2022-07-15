import { createContext, useContext } from 'react';

export const defaultSnackbarSetting = {
  open: false,
  autoHideDuration: 3000,
  message: '',
};

export const SnackbarContext = createContext();
export const useSnackbarContext = () => useContext(SnackbarContext);
