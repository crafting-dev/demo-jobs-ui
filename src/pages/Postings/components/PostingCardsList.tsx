import { Stack } from '@mui/material';

import { Posting } from 'common/types';
import { PostingCard } from 'pages/Postings/components/PostingCard';

interface Postings {
  postings: Posting[];
}

export function PostingCardsList({ postings }: Postings) {
  return (
    <Stack spacing={2}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {postings.map((posting) => (
        <PostingCard posting={posting} key={posting.id} />
      ))}
    </Stack>
  );
}
