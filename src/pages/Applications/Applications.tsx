import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Application } from 'common/types';
import {
  LoadingCardsList,
  ApplicationCardsList,
  NoResult,
} from 'pages/Applications/components';

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

      {!loading && !applications!.length && <NoResult />}
    </Box>
  );
}
