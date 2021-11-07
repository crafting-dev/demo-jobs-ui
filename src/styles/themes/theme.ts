import createTheme from '@mui/material/styles/createTheme'
import { BLACK, GREY, GREYSHADE_3 } from './palette'

export const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: BLACK,
    },
    secondary: {
      main: GREYSHADE_3,
    },
    background: {
      default: GREY,
    },
  },
})
