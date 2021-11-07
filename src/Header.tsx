import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useAuth } from './contexts/auth'
import { WHITE } from './styles/themes/palette'
import { PAGE_WIDTH } from './styles/themes/defaults'

const Header = (): JSX.Element => {
  const [auth, setAuth] = useAuth()

  const SiteName = (): JSX.Element => (
    <Typography
      variant="h6"
      component="a"
      href="/"
      color="primary"
      sx={{
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: '16px',
        // fontWeight: 400,
      }}
    >
      <code>Crafting Jobs</code>
    </Typography>
  )

  const LogInLink = (): JSX.Element => (
    <Link
      href="/login"
      color="primary"
      sx={{
        textTransform: 'uppercase',
        letterSpacing: -0.5,
        textDecoration: 'none',
      }}
    >
      <code>Log In</code>
    </Link>
  )

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: WHITE,
          boxShadow: '0px 1px 20px 0px rgba(238,238,238,1)',
        }}
      >
        <Toolbar
          style={{
            minHeight: 50,
            width: '100%',
            maxWidth: PAGE_WIDTH,
            margin: '0 auto',
          }}
        >
          <SiteName />

          <div style={{ flexGrow: 1 }} />

          {!auth.isAuthenticated && <LogInLink />}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
