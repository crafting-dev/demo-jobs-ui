import { CardContent, Paper, Skeleton, Stack, Typography } from '@mui/material';

import { ListItem } from 'components/common';

export function LoadingCardContent() {
  return (
    <CardContent>
      <Stack spacing={0}>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton />
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
            sx={{ marginBottom: '10px', width: '300px' }}
          >
            <Skeleton />
          </Typography>

          <Skeleton
            variant="rectangular"
            width={50}
            height={20}
            sx={{ borderRadius: '30px' }}
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
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map((chipKey) => (
            <ListItem key={chipKey}>
              <Skeleton
                variant="rectangular"
                width={70}
                height={20}
                sx={{ borderRadius: '30px' }}
              />
            </ListItem>
          ))}
        </Paper>

        <Typography
          variant="body2"
          color="text.primary"
          sx={{ margin: '20px 0' }}
        >
          <Skeleton variant="rectangular" height={150} />
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: '100px' }}
        >
          <Skeleton />
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: '400px' }}
        >
          <Skeleton />
        </Typography>
      </Stack>
    </CardContent>
  );
}
