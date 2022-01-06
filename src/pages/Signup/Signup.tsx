import { FormEvent, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';

import { Client } from 'common/backend-client';
import { ListItem } from 'components/common';

export function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [objType, setObjType] = useState('employer');
  const [tags, setTags] = useState<{
    list: string[];
    new: string;
  }>({
    list: [],
    new: '',
  });
  const [credentials, setCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    showPassword: boolean;
    passwordConfirmation: string;
    showPasswordConfirmation: boolean;
    other: { key: string; value: string };
    errors?: string;
  }>({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    passwordConfirmation: '',
    showPasswordConfirmation: false,
    other: { key: 'location', value: '' },
  });

  const clearErrors = () => {
    setCredentials({ ...credentials, errors: undefined });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    clearErrors();
  };

  const handleReset = () => {
    setActiveStep(0);
    clearErrors();
  };

  const handleObjType = (obj: string) => () => {
    setObjType(obj);

    if (obj === 'employer') {
      setCredentials({
        ...credentials,
        other: { key: 'location', value: '' },
      });
    }

    if (obj === 'worker') {
      setCredentials({
        ...credentials,
        other: { key: 'hourly_rate', value: '' },
      });
    }
  };

  const handleTagsChange = (event: any) => {
    if (event.key === ' ') {
      event.preventDefault();

      tags.list.push(tags.new);
      setTags({ ...tags, new: '' });
    } else {
      setTags({ ...tags, new: event.target.value });
    }
  };

  const handleTagDelete = (tagToDelete: string) => (event: any) => {
    event.preventDefault();

    setTags({
      ...tags,
      list: tags.list.filter((tag: string) => tag !== tagToDelete),
    });
  };

  const handleOtherValueChange = (event: any) => {
    setCredentials({
      ...credentials,
      other: { ...credentials.other, value: event.target.value },
    });
  };

  const handleChange = (prop: string) => (event: any) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const handleClickShowPasswordConfirmation = () => {
    setCredentials({
      ...credentials,
      showPasswordConfirmation: !credentials.showPasswordConfirmation,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const client = new Client();
    const resp = await client.signup(
      credentials.name,
      credentials.email,
      credentials.password,
      credentials.passwordConfirmation,
      credentials.other.key,
      credentials.other.value,
      objType,
      tags.list.join(', ')
    );

    if (resp.error) {
      setCredentials({ ...credentials, errors: resp.error });
    }

    handleNext();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Box
        sx={{
          maxWidth: '500px',
          paddingTop: '100px',
          margin: '0 auto',
        }}
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
          Sign Up
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Select a resource type</StepLabel>
            <StepContent>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="left"
                spacing={2}
              >
                <Typography>Are you an employer or a worker?</Typography>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Resource</FormLabel>
                  <RadioGroup
                    aria-label="resource"
                    defaultValue={objType}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="employer"
                      control={<Radio />}
                      onClick={handleObjType('employer')}
                      label="Employer"
                    />
                    <FormControlLabel
                      value="worker"
                      control={<Radio />}
                      onClick={handleObjType('worker')}
                      label="Worker"
                    />
                  </RadioGroup>
                </FormControl>
                <Box sx={{ mb: 2 }}>
                  <>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                    <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </>
                </Box>
              </Stack>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Fill out your credentials</StepLabel>
            <StepContent>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="left"
                spacing={2}
              >
                <TextField
                  id="outlined-name"
                  label="Full Name"
                  name="full-name"
                  placeholder="Bruce Wayne"
                  onChange={handleChange('name')}
                  value={credentials.name}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  id="outlined-email"
                  label="Email"
                  name="email"
                  placeholder="batman@crafting.dev"
                  onChange={handleChange('email')}
                  value={credentials.email}
                  margin="normal"
                  variant="outlined"
                  fullWidth
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

                <TextField
                  label="Password Confirmation"
                  variant="outlined"
                  type={
                    credentials.showPasswordConfirmation ? 'text' : 'password'
                  }
                  value={credentials.passwordConfirmation}
                  name="password-confirmation"
                  onChange={handleChange('passwordConfirmation')}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={(e: React.SyntheticEvent<EventTarget>) =>
                            e.preventDefault()
                          }
                        >
                          {credentials.showPasswordConfirmation ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {objType === 'employer' ? (
                  <TextField
                    id="outlined-email"
                    label="Location"
                    name="location"
                    placeholder="Gotham City"
                    onChange={handleOtherValueChange}
                    value={credentials.other.value}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                ) : (
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Hourly Rate
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={credentials.other.value}
                      type="number"
                      onChange={handleOtherValueChange}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Hourly Rate"
                    />
                  </FormControl>
                )}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                    <Button
                      disabled={false}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </Stack>
            </StepContent>
          </Step>

          <Step>
            <StepLabel
              optional={<Typography variant="caption">Last step</Typography>}
            >
              Sign up
            </StepLabel>
            <StepContent>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="left"
                spacing={2}
              >
                <Typography>
                  If there are any key tags you would like to include with your
                  profile, please list them below. Otherwise, you can go ahead
                  and click finish!
                </Typography>
                <Typography variant="caption">
                  Write a tag then press the Space bar to add a new tag.
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    backgroundColor: 'transparent',
                  }}
                  component="ul"
                >
                  {tags.list.map((tag: string) => (
                    <ListItem>
                      <Chip
                        label={tag}
                        variant="outlined"
                        color="primary"
                        onDelete={handleTagDelete(tag)}
                      />
                    </ListItem>
                  ))}
                </Paper>

                <TextField
                  id="filled-basic"
                  label="Tags"
                  variant="filled"
                  onChange={handleTagsChange}
                  onKeyDown={handleTagsChange}
                  value={tags.new}
                />

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Finish
                    </Button>
                    <Button
                      disabled={false}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </Stack>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === 3 && !credentials.errors ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>
              Hurray, {credentials.name.split(' ')[0]}! You have successfully
              signed up.
            </strong>
            You can now go ahead and <Link href="/login">log in</Link> with your
            new credentials!
          </Alert>
        ) : (
          <Box>
            {activeStep === 3 && (
              <>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Sign up was not successful — see error message below!
                  <br />
                  <br />
                  <strong>{credentials.errors}</strong>
                </Alert>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </form>
  );
}
