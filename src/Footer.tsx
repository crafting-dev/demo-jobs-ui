import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { WHITE } from './styles/themes/palette'

const Footer = (): JSX.Element => {
  return (
    <Grid sx={{ backgroundColor: WHITE, textAlign: 'center' }}>
      <Typography
        variant="subtitle2"
        gutterBottom
        color="primary"
        sx={{
          letterSpacing: -0.5,
          lineHeight: '50px',
        }}
      >
        <code>
          Copyright &copy; {new Date().getFullYear()}.&nbsp;
          <Link href="https://github.com/crafting-dev" target="_blank">
            @crafting-dev
          </Link>
        </code>
      </Typography>
    </Grid>
  )
}

export default Footer
