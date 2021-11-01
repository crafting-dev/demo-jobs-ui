import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, alpha } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Lock from '@mui/icons-material/Lock'
import Face from '@mui/icons-material/Face'
import TocIcon from '@mui/icons-material/Toc'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import theme from '../assets/themes/mui'
import { unauthenticated } from '../models/Auth'
import { useAuth } from '../contexts/authContext'
import { deleteUser } from '../adapters/Store'
import { RevokeToken } from '../adapters/Authenticate'

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(() => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

function Header() {
  const [auth, setAuth] = useAuth()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [anchorDropdownEl, setAnchorDropdownEl] =
    React.useState<null | HTMLElement>(null)
  const dropdownOpen = Boolean(anchorDropdownEl)
  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorDropdownEl(event.currentTarget)
  }
  const handleCloseDropdown = () => {
    setAnchorDropdownEl(null)
  }

  const [anchorDropdownAppEl, setAnchorDropdownAppEl] =
    React.useState<null | HTMLElement>(null)
  const dropdownAppOpen = Boolean(anchorDropdownAppEl)
  const handleClickDropdownApp = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorDropdownAppEl(event.currentTarget)
  }
  const handleCloseDropdownApp = () => {
    setAnchorDropdownAppEl(null)
  }

  const handleFollowPathLink = (path: string) => (e: FormEvent) => {
    e.preventDefault()

    history.push(path)
  }

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()

    RevokeToken(auth.token, auth.id)
    deleteUser()
    setAuth(unauthenticated)
    history.push('/login')
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: '1px solid #EEEEEE',
          color: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              color: '#282828',
              textDecoration: 'none',
            }}
          >
            Crafting [Jobs]
          </Typography>

          <div style={{ flexGrow: 1 }} />

          {auth.isAuthenticated ? (
            <>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
              >
                <div>
                  <Button
                    id="customized-postings-button"
                    aria-controls="customized-postings-menu"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClickDropdown}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Postings
                  </Button>
                  <StyledMenu
                    id="customized-postings-menu"
                    MenuListProps={{
                      'aria-labelledby': 'customized-postings-button',
                    }}
                    anchorEl={anchorDropdownEl}
                    open={dropdownOpen}
                    onClose={handleCloseDropdown}
                  >
                    <MenuItem
                      onClick={handleFollowPathLink('/postings')}
                      disableRipple
                    >
                      <TocIcon />
                      List postings
                    </MenuItem>
                  </StyledMenu>
                </div>

                <div>
                  <Button
                    id="customized-applications-button"
                    aria-controls="customized-applications-menu"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClickDropdownApp}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Applications
                  </Button>
                  <StyledMenu
                    id="customized-applications-menu"
                    MenuListProps={{
                      'aria-labelledby': 'customized-applications-button',
                    }}
                    anchorEl={anchorDropdownAppEl}
                    open={dropdownAppOpen}
                    onClose={handleCloseDropdownApp}
                  >
                    <MenuItem
                      onClick={handleFollowPathLink('/applications')}
                      disableRipple
                    >
                      <TocIcon />
                      List applications
                    </MenuItem>
                  </StyledMenu>
                </div>

                {auth.type === 'Employer' && (
                  <Button component="a" href="/create/posting" variant="text">
                    Create Post
                  </Button>
                )}

                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={auth.name} src={auth.avatarUrl} />
                  </StyledBadge>
                </Button>
                <StyledMenu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleFollowPathLink('/dashboard')}>
                    <Face
                      sx={{
                        marginRight: 2,
                      }}
                    />{' '}
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Lock
                      sx={{
                        marginRight: 2,
                      }}
                    />{' '}
                    Logout
                  </MenuItem>
                </StyledMenu>
              </Stack>
            </>
          ) : (
            <>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
              >
                <Button component="a" href="/login" variant="contained">
                  Log In
                </Button>
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
