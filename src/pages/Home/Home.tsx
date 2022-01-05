import { Box, Link, Stack, Typography } from '@mui/material';

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
        <Typography variant="h4" color="primary" component="div" gutterBottom>
          Crafting Jobs.
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px' }}
        >
          Welcome to the best job market in the market!
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px' }}
        >
          If you are an employer, you can find your next{' '}
          <Link href="/postings">best candidates</Link> from among our thousands
          of quality applicants. If you are a worker, you will undoubtedly find
          your next <Link href="/postings">big role</Link> from our
          comprehensive list of private postings with amazing companies.
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          component="div"
          gutterBottom
          sx={{ fontSize: '18px' }}
        >
          <Link href="/signup">Create an account</Link> and get started today!
        </Typography>
      </Stack>
    </Box>
  );
}
