import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { genUniqueId, statusColorTheme } from 'common/helpers';
import { Application } from 'common/types';
import { ListItem } from 'components/common';
import { colors } from 'styles/palette';

export function ApplicationCard({
  application,
  authType,
}: {
  application: Application;
  authType: string;
}) {
  const history = useHistory();

  const handleClickLink =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(`/applications/${id}`);
    };

  return (
    <Card elevation={1} sx={{ backgroundColor: colors.white[100] }}>
      <CardActionArea onClick={handleClickLink(application.id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {application.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: '10px' }}
            >
              Job application - Created{' '}
              <ReactTimeAgo date={new Date(application.createdAt)} /> by{' '}
              {authType === 'Worker' ? 'me' : application.name}
            </Typography>
            <Chip
              label={application.status}
              size="small"
              variant="outlined"
              color={statusColorTheme(application.status!)}
            />
          </Stack>

          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexWrap: 'wrap',
              listStyle: 'none',
              paddingLeft: 0,
              p: 0,
              m: 0,
              maxWidth: '450px',
              backgroundColor: 'transparent',
            }}
            component="ul"
          >
            {application.tags?.split(', ').map((tag) => (
              <ListItem key={`${tag}-${genUniqueId()}`}>
                <Chip
                  label={tag}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </ListItem>
            ))}
          </Paper>

          <Typography
            variant="body2"
            color="text.primary"
            sx={{ margin: '20px 0' }}
          >
            {application.content}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Original job post: {application.posting?.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
