import { useState } from 'react';

import {
  Logout,
  Settings,
  Face as FaceIcon,
  Dashboard as DashboardIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Grid,
  ListItemIcon,
  MenuItem,
  Stack,
  Toolbar,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import { useHistory, Link } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Auth } from 'common/types';
import { StyledBadge, StyledMenu } from 'components';
import { colors } from 'styles';

function PublicLinks() {
  const history = useHistory();

  const handleClickLink =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(path);
    };

  return (
    <>
      {[
        { path: '/login', text: 'Log In' },
        { path: '/signup', text: 'Sign Up' },
      ].map((link) => (
        <Button
          variant="text"
          onClick={handleClickLink(link.path)}
          color="primary"
          key={link.path}
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Source Sans Pro',
          }}
        >
          {link.text}
        </Button>
      ))}
    </>
  );
}

export function Header() {
  const history = useHistory();
  const [auth, setAuth] = useAuth();

  const [anchorElAcc, setAnchorElAcc] = useState<HTMLElement | null>(null);
  const [anchorElPos, setAnchorElPos] = useState<HTMLElement | null>(null);
  const [anchorElApp, setAnchorElApp] = useState<HTMLElement | null>(null);

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAcc(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAcc(null);
  };

  const handleClickPostings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPos(event.currentTarget);
  };

  const handleClosePostings = () => {
    setAnchorElPos(null);
  };

  const handleClickApplications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElApp(event.currentTarget);
  };

  const handleCloseApplications = () => {
    setAnchorElApp(null);
  };

  const handleClickLink =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(path);
    };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const client = new Client(auth);
    const resp = await client.logout();
    if (!resp.error) {
      setAuth(resp.data! as Auth);
      history.push('/login');
    }
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: colors.white[200],
          boxShadow: '0px 1px 20px 0px rgba(238,238,238,1)',
        }}
      >
        <Toolbar
          style={{
            minHeight: 50,
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: colors.black[200],
              fontFamily: 'Source Sans Pro',
            }}
          >
            Crafting Jobs
          </Link>

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
                  onClick={handleClickPostings}
                  size="small"
                  sx={{
                    fontFamily: 'Source Sans Pro',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  Postings
                </Button>
                <StyledMenu
                  anchorEl={anchorElPos}
                  open={Boolean(anchorElPos)}
                  onClick={handleClosePostings}
                  onClose={handleClosePostings}
                >
                  <MenuItem onClick={handleClickLink('/postings')}>
                    <ListItemIcon>
                      <ChevronRightIcon fontSize="small" />
                    </ListItemIcon>
                    All Postings
                  </MenuItem>
                  {auth.type === 'Employer' && (
                    <Grid>
                      <MenuItem onClick={handleClickLink('/postings/personal')}>
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        My Postings
                      </MenuItem>
                      <MenuItem
                        onClick={handleClickLink('/postings/personal/active')}
                      >
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        My Active Postings
                      </MenuItem>
                      <MenuItem onClick={handleClickLink('/postings/create')}>
                        <ListItemIcon>
                          <ChevronRightIcon fontSize="small" />
                        </ListItemIcon>
                        Create a Posting
                      </MenuItem>
                    </Grid>
                  )}
                </StyledMenu>

                <Button
                  variant="text"
                  onClick={handleClickApplications}
                  size="small"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Source Sans Pro',
                    fontSize: '14px',
                  }}
                >
                  Applications
                </Button>
                <StyledMenu
                  anchorEl={anchorElApp}
                  open={Boolean(anchorElApp)}
                  onClick={handleCloseApplications}
                  onClose={handleCloseApplications}
                >
                  <MenuItem onClick={handleClickLink('/applications')}>
                    <ListItemIcon>
                      <ChevronRightIcon fontSize="small" />
                    </ListItemIcon>
                    My Applications
                  </MenuItem>
                  <MenuItem onClick={handleClickLink('/applications/active')}>
                    <ListItemIcon>
                      <ChevronRightIcon fontSize="small" />
                    </ListItemIcon>
                    My Active Applications
                  </MenuItem>
                </StyledMenu>

                <IconButton onClick={handleClickAccount} size="small">
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
                  anchorEl={anchorElAcc}
                  open={Boolean(anchorElAcc)}
                  onClick={handleCloseAccount}
                  onClose={handleCloseAccount}
                >
                  <MenuItem onClick={handleClickLink('/dashboard')}>
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
                  <MenuItem disabled>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
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
  );
}
