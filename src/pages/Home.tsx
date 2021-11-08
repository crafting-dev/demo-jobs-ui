import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { PAGEWIDTH } from '../styles/themes/defaults'

const Home = (): JSX.Element => {
  return (
    <>
      <Grid
        sx={{
          width: '100%',
          maxWidth: PAGEWIDTH,
          margin: '0 auto',
          padding: '100px 20px',
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={6}
        >
          <Typography variant="h4" color="primary" component="div" gutterBottom>
            <code>Crafting Jobs.</code>
          </Typography>

          <Typography
            variant="body1"
            color="primary"
            component="div"
            gutterBottom
          >
            <code>Welcome to the best job market in the market!</code>
          </Typography>

          <Typography
            variant="body1"
            color="primary"
            component="div"
            gutterBottom
          >
            <code>
              If you are an employer, you can find your next{' '}
              <Link href="/postings">best candidates</Link> from among our
              thousands of quality applicants. If you are a worker, you will
              undoubtedly find your next <Link href="/postings">big role</Link>{' '}
              from our comprehensive list of private postings with amazing
              companies.
            </code>
          </Typography>

          <Typography
            variant="body1"
            color="primary"
            component="div"
            gutterBottom
          >
            <code>
              <Link href="/login">Create an account</Link> and get started
              today!
            </code>
          </Typography>
        </Stack>
      </Grid>
    </>
  )
}

export default Home
