import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { colors } from 'styles/palette';

export function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '100px 20px',
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={6}
        sx={{ maxWidth: '800px' }}
      >
        <Typography
          variant="h4"
          color="primary"
          component="div"
          gutterBottom
          sx={{
            fontFamily: 'Source Sans Pro',
          }}
        >
          Crafting Jobs.
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px', fontFamily: 'Source Sans Pro' }}
        >
          Welcome to the best job market in the market!
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px', fontFamily: 'Source Sans Pro' }}
        >
          If you are an employer, you can find your next{' '}
          <Link style={{ color: colors.black[200] }} to="/postings">
            best candidates
          </Link>{' '}
          from among our thousands of quality applicants. If you are a worker,
          you will undoubtedly find your next{' '}
          <Link style={{ color: colors.black[200] }} to="/postings">
            big role
          </Link>{' '}
          from our comprehensive list of private postings with amazing
          companies.
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px', fontFamily: 'Source Sans Pro' }}
        >
          <Link style={{ color: colors.black[200] }} to="/signup">
            Create an account
          </Link>{' '}
          and get started today!
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          zIndex: -100,
          height: '100%',
          width: '100px',
          right: '200px',
          transform: 'rotateY(0deg) rotate(45deg)',
          backgroundColor: colors.grey[100],
        }}
      />
    </Box>
  );
}
