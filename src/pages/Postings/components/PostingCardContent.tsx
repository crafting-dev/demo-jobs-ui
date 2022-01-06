import { CardContent, Chip, Paper, Stack, Typography } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';

import { genUniqueId, statusColorTheme } from 'common/helpers';
import { Posting } from 'common/types';
import { ListItem } from 'components/common';

export function PostingCardContent({ posting }: { posting: Posting }) {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {posting.title}
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
          Job post - Created <ReactTimeAgo date={new Date(posting.createdAt)} />{' '}
          by {posting.employer?.name}
        </Typography>
        <Chip
          label={posting.status}
          size="small"
          variant="outlined"
          color={statusColorTheme(posting.status!)}
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
        {posting.tags?.split(', ').map((tag) => (
          <ListItem key={`${tag}-${genUniqueId()}`}>
            <Chip label={tag} size="small" variant="outlined" color="primary" />
          </ListItem>
        ))}
      </Paper>

      <Typography
        variant="body2"
        color="text.primary"
        sx={{ margin: '20px 0' }}
      >
        {posting.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Total hours: {posting.hours}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Location: {posting.employer?.location}
      </Typography>
    </CardContent>
  );
}
