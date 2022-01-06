import { memo, useEffect, useState } from 'react';

import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material';
import fuzzysort from 'fuzzysort';
import { Frown, Search } from 'react-feather';

import { Client } from 'common/backend-client';
import { useAuth } from 'common/hooks';
import { Posting } from 'common/types';
import { LoadingCardsList, PostingCardsList } from 'pages/Postings/components';
import { colors } from 'styles/palette';

export function Postings() {
  const auth = useAuth()[0];
  const [postings, setPostings] = useState<Posting[]>([]);
  const [searchResults, setSearchResults] =
    useState<Fuzzysort.KeysResults<Posting>>();
  const [loading, setLoading] = useState(true);

  const SearchField = memo(() => {
    const [search, setSearch] = useState('');

    const fuzzySearch = (phrase: string) => {
      const options = {
        keys: [
          'tags',
          'title',
          'description',
          'employer.name',
          'employer.location',
        ],
        limit: 50, // don't return more results than needed
        allowTypo: true,
        threshold: -1000, // don't return bad results
      };
      const phraseSearchResults = fuzzysort.go(phrase, postings, options);
      setSearchResults(phraseSearchResults);
    };

    const handleChange = (event: any) => {
      event.preventDefault();
      setSearch(event.target.value);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      fuzzySearch(search);
    };

    return (
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginBottom: '50px',
          boxShadow: '0px 1px 20px 0px rgba(238,238,238,1)',
          border: `1px solid ${colors.grey[100]}`,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, paddingLeft: '5px' }}
          placeholder="Search postings ..."
          onChange={handleChange}
          value={search}
          inputProps={{ 'aria-label': 'Search job postings' }}
        />
        <IconButton
          type="submit"
          onClick={handleSubmit}
          sx={{ p: '10px' }}
          aria-label="search"
        >
          <Search color={colors.black[200]} />
        </IconButton>
      </Paper>
    );
  });

  useEffect(() => {
    async function populatePostings() {
      const client = new Client(auth);
      const resp = await client.getPostings();
      if (!resp.error) {
        setPostings(resp.data! as Posting[]);
      }
    }

    populatePostings().then(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <SearchField />

      {loading && <LoadingCardsList />}

      {!loading && !searchResults && <PostingCardsList postings={postings} />}

      {!loading && searchResults && (
        <PostingCardsList
          postings={searchResults.map((result) => result.obj)}
        />
      )}

      {!loading &&
        (!postings.length || (searchResults && !searchResults.length)) && (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Frown color={colors.black[200]} size={200} strokeWidth={1} />

            <Typography
              variant="h1"
              sx={{
                textTransform: 'uppercase',
                color: colors.black[200],
                fontSize: '30px',
                marginTop: '50px',
              }}
            >
              Nothing!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: colors.black[200],
                fontSize: '18px',
              }}
            >
              Your collection list is empty.
            </Typography>
          </Box>
        )}
    </Box>
  );
}
