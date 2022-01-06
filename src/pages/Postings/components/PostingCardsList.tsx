import { Card, CardActionArea, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Posting } from 'common/types';
import { PostingCardContent } from 'pages/Postings/components/PostingCardContent';
import { colors } from 'styles/palette';

interface Postings {
  postings: Posting[];
}

export function PostingCardsList({ postings }: Postings) {
  const history = useHistory();

  const handleClickLink =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(`/postings/${id}`);
    };

  return (
    <Stack spacing={3}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {postings.map((posting) => (
        <Card
          key={posting.id}
          elevation={1}
          sx={{ backgroundColor: colors.white[100] }}
        >
          <CardActionArea onClick={handleClickLink(posting.id)}>
            <PostingCardContent posting={posting} />
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
