import { Box, Typography } from '@mui/material';
import { Frown } from 'react-feather';

import { colors } from 'styles/palette';

export function NoResult() {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Frown color={colors.black[200]} size={200} strokeWidth={1} />

      <Typography
        variant="h1"
        sx={{
          color: colors.black[200],
          fontSize: '30px',
          marginTop: '50px',
        }}
      >
        Aw snap!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: colors.black[200],
          fontSize: '18px',
        }}
      >
        Your results list is empty, please try again
      </Typography>
    </Box>
  );
}
