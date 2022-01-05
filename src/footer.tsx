import { Box, Link, Typography } from '@mui/material';

import { colors } from 'styles';

export function Footer() {
  return (
    <Box sx={{ backgroundColor: colors.white[200], textAlign: 'center' }}>
      <Typography
        variant="subtitle2"
        gutterBottom
        color="primary"
        sx={{
          letterSpacing: -0.5,
          lineHeight: '50px',
        }}
      >
        Copyright &copy; {new Date().getFullYear()}.&nbsp;
        <Link href="https://www.crafting.dev" target="_blank">
          @crafting-dev
        </Link>
      </Typography>
    </Box>
  );
}
