import { Card, CardActionArea, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Application } from 'common/types';
import { ApplicationCardContent } from 'pages/Applications/components/ApplicationCardContent';
import { colors } from 'styles/palette';

interface Applications {
  applications: Application[];
  authType: string;
}

export function ApplicationCardsList({ applications, authType }: Applications) {
  const history = useHistory();

  const handleClickLink =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(`/applications/${id}`);
    };

  return (
    <Stack spacing={2}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {applications.map((application) => (
        <Card
          key={application.id}
          elevation={1}
          sx={{ backgroundColor: colors.white[100] }}
        >
          <CardActionArea onClick={handleClickLink(application.id)}>
            <ApplicationCardContent
              application={application}
              authType={authType}
            />
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
