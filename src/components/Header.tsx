import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { RevokeToken } from "../adapters/Authenticate";
import { deleteUser } from "../adapters/Store";
import { useAuth } from "../contexts/authContext";
import { unauthenticated } from "../models/Auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Link from "@mui/material/Link";
import theme from "../assets/themes/mui";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Lock from "@mui/icons-material/Lock";
import Face from "@mui/icons-material/Face";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Header() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();

    RevokeToken(auth.token, auth.id);
    deleteUser();
    setAuth(unauthenticated);
    history.push("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: "1px solid #EEEEEE",
          color: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              color: "#282828",
              textDecoration: "none",
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
                <Tooltip title="View all job postings">
                  <Link href="/postings">Postings</Link>
                </Tooltip>

                {auth.type === "Employer" ? (
                  <Tooltip title="Create a new job posting">
                    <Link href="/create/posting">Create Posting</Link>
                  </Tooltip>
                ) : (
                  <Tooltip title="List all my previous applications">
                    <Link href="/applications">My Applications</Link>
                  </Tooltip>
                )}

                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt={auth.name} src={auth.avatarUrl} />
                  </StyledBadge>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => history.push("/dashboard")}>
                    <Face
                      sx={{
                        marginRight: 2,
                      }}
                    />{" "}
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Lock
                      sx={{
                        marginRight: 2,
                      }}
                    />{" "}
                    Logout
                  </MenuItem>
                </Menu>
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
    </ThemeProvider>
  );
}

export default Header;
