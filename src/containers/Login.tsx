import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticateToken from "../adapters/Authenticate";
import { setUser } from "../adapters/Store";
import { useAuth } from "../contexts/authContext";
import Auth from "../models/Auth";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../assets/themes/mui";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    showPassword: false,
    errors: false,
  });

  const handleChange = (prop: any) => (e: { target: { value: any } }) => {
    setCredentials({ ...credentials, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await AuthenticateToken(credentials.email, credentials.password)
      .then((response) => {
        const user: Auth = {
          token: response.data.attributes.token,
          id: response.data.id,
          name: response.data.attributes.bearer.name,
          email: response.data.attributes.bearer.email,
          type: response.data.attributes.bearer.type,
          avatarUrl: response.data.attributes.bearer.avatar,
          redirectPath: auth.redirectPath,
          isAuthenticated: true,
        };
        setAuth(user);
        setUser(user);

        history.push("/postings");
      })
      .catch((error) => {
        setCredentials({ ...credentials, errors: error.toString() });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "500px",
          paddingTop: "100px",
          margin: "0 auto",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h2"
              component="h2"
              color="inherit"
              sx={{
                width: "100%",
                marginBottom: "30px",
              }}
            >
              Log In
            </Typography>

            <TextField
              id="outlined-email"
              label="Email"
              name="email"
              placeholder="batman@crafting.dev"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={handleChange("email")}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={credentials.showPassword ? "text" : "password"}
              value={credentials.password}
              name="password"
              onChange={handleChange("password")}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e: React.SyntheticEvent<EventTarget>) =>
                        e.preventDefault()
                      }
                    >
                      {credentials.showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={26}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="/login">Forgot password?</Link>
            </Stack>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                lineHeight: "40px",
              }}
            >
              Log In
            </Button>

            <Typography
              variant="body1"
              component="p"
              color="inherit"
              sx={{
                width: "100%",
              }}
            >
              Don't have an account? <Link href="/signup">Sign up now!</Link>
            </Typography>

            {credentials.errors && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Sign up was not successful — see error message below!
                <br />
                <br />
                <strong>Incorrect Email/Password used</strong>
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
