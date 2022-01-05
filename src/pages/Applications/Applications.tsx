import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Frown } from 'react-feather';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Application } from 'common/types';
import {
  LoadingCardsList,
  ApplicationCardsList,
} from 'pages/Applications/components';
import { colors } from 'styles/palette';

export function Applications() {
  const auth = useAuth()[0];

  const [applications, setApplications] = useState<Application[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function populateApplications() {
      const client = new Client(auth);
      const resp = await client.getApplications();
      if (!resp.error) {
        setApplications(resp.data as Application[]);
      }
    }

    populateApplications().then(() => setLoading(false));
  }, [auth.token]);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      {loading && <LoadingCardsList />}

      {!loading && (
        <ApplicationCardsList
          applications={applications!}
          authType={auth.type!}
        />
      )}

      {!loading && !applications!.length && (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
          <Frown color={colors.black[200]} size={200} strokeWidth={1} />

          <Typography
            variant="h1"
            sx={{
              textTransform: 'uppercase',
              color: colors.black[200],
              fontSize: '30px',
              marginTop: '50px',
            }}
          >
            Nothing!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: colors.black[200],
              fontSize: '18px',
            }}
          >
            Your collection list is empty.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
