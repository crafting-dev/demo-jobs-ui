import { Stack } from '@mui/material';

import { Application } from 'common/types';
import { ApplicationCard } from 'pages/Applications/components/ApplicationCard';

interface Applications {
  applications: Application[];
  authType: string;
}

export function ApplicationCardsList({ applications, authType }: Applications) {
  return (
    <Stack spacing={2}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {applications.map((application) => (
        <ApplicationCard
          application={application}
          authType={authType}
          key={application.id}
        />
      ))}
    </Stack>
  );
}
