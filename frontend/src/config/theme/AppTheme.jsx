import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { blackTheme } from './blackTheme';
import { greenTheme } from './greenTheme';
//import { yellowTheme } from './yellowTheme';

export const AppTheme = ({ children }) => {
  //const { colorTheme } = useSelector((state) => state.common);

  return (
    //<ThemeProvider theme={colorTheme === 'black' ? blackTheme : yellowTheme}>
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
