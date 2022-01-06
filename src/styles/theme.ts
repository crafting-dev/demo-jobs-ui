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
      default:
        'linear-gradient(145deg, rgba(2,0,36,1) 0%, rgba(245,245,245,1) 35%, rgba(0,212,255,1) 100%)',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 20px 0px rgba(238,238,238,1)',
          border: 'none',
        },
      },
    },
  },
});
