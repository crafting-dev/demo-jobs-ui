import { Card, Stack } from '@mui/material';

import { LoadingCardContent } from 'pages/Applications/components/LoadingCardContent';
import { colors } from 'styles/palette';

export function LoadingCardsList() {
  return (
    <Stack spacing={3}>
      {['one', 'two', 'three', 'four', 'five'].map((key) => (
        <Card key={key} elevation={1} sx={{ background: colors.white[100] }}>
          <LoadingCardContent />
        </Card>
      ))}
    </Stack>
  );
}
