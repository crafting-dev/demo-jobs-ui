import { useEffect, useState } from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Application } from 'common/types';
import {
  LoadingCardContent,
  ApplicationCardContent,
} from 'pages/Applications/components';
import { colors } from 'styles/palette';

export function ViewApplication() {
  const auth = useAuth()[0];
  const history = useHistory();
  const { id }: any = useParams();

  const [application, setApplication] = useState<Application>();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState('applied');
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<string>();
  const [redirect, setRedirect] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStatus((event.target as HTMLInputElement).value);
  };

  const handleSubmitChangeStatus = async (event: any) => {
    event.preventDefault();

    if (status === 'applied') {
      setErrors('You have to make a hire/no-hire decision.');
    } else {
      const client = new Client(auth);
      const resp = await client.updateApplicationStatus(id, status);
      if (resp.error) {
        setErrors(resp.error);
      } else {
        setSubmitSuccess(true);
        setApplication({ ...application!, status });
        history.push(`/applications/${application!.id}`);
      }
    }
  };

  useEffect(() => {
    async function getApplication() {
      const client = new Client(auth);
      const resp = await client.getApplication(id);
      if (!resp.error) {
        setApplication(resp.data as Application);
      } else {
        setRedirect(true);
      }
    }

    getApplication().then(() => setLoading(false));
  }, [id, auth.token]);

  useEffect(() => {
    if (redirect) {
      history.push('/applications');
    }
  }, [redirect]);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      {loading && (
        <Card elevation={1} sx={{ background: colors.white[100] }}>
          <LoadingCardContent />
        </Card>
      )}

      {!loading && (
        <Card elevation={1} sx={{ backgroundColor: colors.white[100] }}>
          <ApplicationCardContent
            application={application!}
            authType={auth.type!}
          />
        </Card>
      )}

      {!loading &&
        !submitSuccess &&
        auth.type === 'Employer' &&
        application!.status === 'applied' && (
          <Stack spacing={1} sx={{ marginTop: '30px' }}>
            <Button
              style={{ maxWidth: '200px' }}
              variant="contained"
              onClick={handleExpandClick}
            >
              Process Application
            </Button>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Decision</FormLabel>
                  <RadioGroup
                    aria-label="decision"
                    name="controlled-radio-buttons-group"
                    value={status}
                    onChange={handleChangeStatus}
                  >
                    <FormControlLabel
                      value="hired"
                      control={<Radio />}
                      label="Hire"
                    />
                    <FormControlLabel
                      value="rejected"
                      control={<Radio />}
                      label="Reject"
                    />
                  </RadioGroup>
                  <Button
                    style={{ maxWidth: '100px', marginTop: '20px' }}
                    variant="outlined"
                    onClick={handleSubmitChangeStatus}
                  >
                    Submit
                  </Button>
                </FormControl>
              </CardContent>
            </Collapse>
          </Stack>
        )}

      {submitSuccess && (
        <Box sx={{ paddingTop: '20px' }}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Thank you for submitting a decision!
          </Alert>
        </Box>
      )}

      {errors && (
        <Box sx={{ paddingTop: '20px' }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Your decision did not submit successfully — see error message below!
            <br />
            <br />
            <strong>Status: {errors}</strong>
          </Alert>
        </Box>
      )}
    </Box>
  );
}
