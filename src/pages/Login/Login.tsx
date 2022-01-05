import { FormEvent, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Auth } from 'common/types';

export function Login() {
  const history = useHistory();
  const [auth, setAuth] = useAuth();

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
    showPassword: boolean;
    error?: string;
  }>({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: string) => (event: { target: { value: any } }) => {
      setCredentials({ ...credentials, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const client = new Client(auth);
    const user = await client.login(credentials.email, credentials.password);

    if (user.error) {
      setCredentials({ ...credentials, error: user.error });
    } else {
      setAuth(user.data! as Auth);
      history.push(auth.redirectPath);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '540px',
        padding: '100px 20px',
        margin: '0 auto',
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
            color="primary"
            sx={{
              width: '100%',
              marginBottom: '30px',
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
            onChange={handleChange('email')}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={credentials.showPassword ? 'text' : 'password'}
            value={credentials.password}
            name="password"
            onChange={handleChange('password')}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event: React.SyntheticEvent<EventTarget>) =>
                      event.preventDefault()
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
              lineHeight: '40px',
            }}
          >
            Log In
          </Button>

          <Typography
            variant="body1"
            component="p"
            color="inherit"
            sx={{
              width: '100%',
            }}
          >
            Don&apos;t have an account? <Link href="/signup">Sign up now!</Link>
          </Typography>

          {credentials.error && (
            <Alert
              severity="error"
              sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
            >
              <AlertTitle>Error</AlertTitle>
              Log in was not successful — see error message below!
              <br />
              <br />
              <strong>{credentials.error}</strong>
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
}
