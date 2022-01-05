import { Stack } from '@mui/material';

import { LoadingCard } from 'pages/Applications/components/LoadingCard';

export function LoadingCardsList() {
  return (
    <Stack spacing={2}>
      {['one', 'two', 'three', 'four', 'five'].map((key) => (
        <LoadingCard key={key} />
      ))}
    </Stack>
  );
}
