import { createTheme } from '@mui/material/styles';

import { colors } from 'styles/palette';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.black[200],
    },
    secondary: {
      main: colors.grey[200],
    },
    background: {
      default: colors.grey[100],
    },
  },
});
