import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FaceIcon from '@mui/icons-material/Face'
import Divider from '@mui/material/Divider'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useAuth } from './contexts/auth'
import { deleteUser } from './adapters/store'
import { RevokeToken } from './adapters/auth'
import { unauthenticated } from './models/Auth'
import { PAGEWIDTH } from './styles/themes/defaults'
import { WHITE } from './styles/themes/palette'
import StyledBadge from './components/StyledBadge'
import StyledMenu from './components/StyledMenu'

const Header = (): JSX.Element => {
  const history = useHistory()
  const [auth, setAuth] = useAuth()
  const [anchorEl, setAnchorEl] = useState<{
    account: HTMLElement | null
    postings: HTMLElement | null
    applications: HTMLElement | null
  }>({
    account: null,
    postings: null,
    applications: null,
  })

  const open = (prop: string): boolean => {
    if (prop === 'account') return Boolean(anchorEl.account)
    if (prop === 'postings') return Boolean(anchorEl.postings)
    if (prop === 'applications') return Boolean(anchorEl.applications)
    return Boolean(null)
  }

  const handleClick = (prop: any) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({ ...anchorEl, [prop]: event.currentTarget })
  }

  const handleClose = (prop: string) => () => {
    setAnchorEl({ ...anchorEl, [prop]: null })
  }

  const handleFollowPathLink =
    (path: string) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault()
      history.push(path)
    }

  const handleLogout = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    RevokeToken(auth.token, auth.id)
    deleteUser()
    setAuth(unauthenticated)
    history.push('/login')
  }

  const SiteName = (): JSX.Element => (
    <Typography
      variant="h6"
      component="a"
      onClick={handleFollowPathLink('/')}
      color="primary"
      sx={{
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: '16px',
        letterSpacing: -0.5,
        cursor: 'pointer',
      }}
    >
      <code>Crafting Jobs</code>
    </Typography>
  )

  const PublicLinks = (): JSX.Element => (
    <>
      {[
        { path: '/login', text: 'Log In' },
        { path: '/signup', text: 'Sign Up' },
      ].map((link) => {
        return (
          <Button
            variant="text"
            onClick={handleFollowPathLink(link.path)}
            color="primary"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: -0.5,
              fontWeight: 'bold',
            }}
          >
            <code>{link.text}</code>
          </Button>
        )
      })}
    </>
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
            maxWidth: PAGEWIDTH,
            margin: '0 auto',
          }}
        >
          <SiteName />

          <div style={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={4}
          >
            {!auth.isAuthenticated && <PublicLinks />}

            {auth.isAuthenticated && (
              <>
                <Button
                  variant="text"
                  onClick={handleClick('postings')}
                  size="small"
                  sx={{ fontWeight: 'bold', letterSpacing: -0.5 }}
                >
                  <code>Postings</code>
                </Button>
                <StyledMenu
                  anchorEl={anchorEl.postings}
                  open={open('postings')}
                  onClose={handleClose('postings')}
                  onClick={handleClose('postings')}
                >
                  <MenuItem onClick={handleFollowPathLink('/postings')}>
                    <ListItemIcon>
                      <ChevronRightIcon fontSize="small" />
                    </ListItemIcon>
                    All Postings
                  </MenuItem>
                  {auth.type === 'Employer' && (
                    <>
                      <MenuItem disabled>
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        My Postings
                      </MenuItem>
                      <MenuItem disabled>
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        My Active Postings
                      </MenuItem>
                      <MenuItem
                        onClick={handleFollowPathLink('/create/posting')}
                      >
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        Create a Posting
                      </MenuItem>
                    </>
                  )}
                </StyledMenu>

                <Button
                  variant="text"
                  onClick={handleClick('applications')}
                  size="small"
                  sx={{ fontWeight: 'bold', letterSpacing: -0.5 }}
                >
                  <code>Applications</code>
                </Button>
                <StyledMenu
                  anchorEl={anchorEl.applications}
                  open={open('applications')}
                  onClose={handleClose('applications')}
                  onClick={handleClose('applications')}
                >
                  <MenuItem onClick={handleFollowPathLink('/applications')}>
                    <ListItemIcon>
                      <ChevronRightIcon fontSize="small" />
                    </ListItemIcon>
                    My Applications
                  </MenuItem>
                  {auth.type === 'Worker' && (
                    <>
                      <MenuItem disabled>
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        My Active Applications
                      </MenuItem>
                    </>
                  )}
                </StyledMenu>

                <IconButton onClick={handleClick('account')} size="small">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar
                      alt={auth.name}
                      src={auth.avatarUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                  </StyledBadge>
                </IconButton>
                <StyledMenu
                  anchorEl={anchorEl.account}
                  open={open('account')}
                  onClose={handleClose('account')}
                  onClick={handleClose('account')}
                >
                  <MenuItem onClick={handleFollowPathLink('/dashboard')}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem disabled>
                    <ListItemIcon>
                      <FaceIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem disabled>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Log out
                  </MenuItem>
                </StyledMenu>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
