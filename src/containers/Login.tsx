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

function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState({
    password: "",
    showPassword: false,
  });

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange =
    (prop: any) => (e: { target: { value: any } }) => {
      setPass({ ...pass, [prop]: e.target.value });
    };

  const handleClickShowPassword = () => {
    setPass({ ...pass, showPassword: !pass.showPassword });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await AuthenticateToken(email, pass.password);
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
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          paddingTop: "100px",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h2" component="h2" color="inherit">
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
            onChange={handleEmailChange}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={pass.showPassword ? "text" : "password"}
            value={pass.password}
            name="password"
            onChange={handlePasswordChange("password")}
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
                    {pass.showPassword ? (
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
            <FormControlLabel
              control={<Checkbox disabled />}
              label="Remember me"
            />
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
        </Stack>
      </form>
    </ThemeProvider>
  );
}

export default Login;
