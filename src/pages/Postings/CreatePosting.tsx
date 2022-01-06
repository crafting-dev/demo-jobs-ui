import { FormEvent, useEffect, useState } from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { genUniqueId } from 'common/helpers';
import { useAuth } from 'common/hooks';
import { Posting } from 'common/types';
import { ListItem } from 'components/common';

export function CreatePosting() {
  const auth = useAuth()[0];
  const history = useHistory();

  const [posting, setPosting] = useState<{
    title: string;
    description: string;
    hours: number;
    status: string;
    errors?: string;
  }>({
    title: '',
    description: '',
    hours: 0,
    status: 'posted',
  });
  const [tags, setTags] = useState<{ list: string[]; new: string }>({
    list: [],
    new: '',
  });

  const handleChange = (prop: string) => (event: any) => {
    setPosting({ ...posting, [prop]: event.target.value });
  };

  const handleTagsChange = (event: any) => {
    if (event.key === ' ') {
      event.preventDefault();
      tags.list.push(tags.new);
      setTags({ ...tags, new: '' });
    } else {
      setTags({ ...tags, new: event.target.value });
    }
  };

  const handleTagDelete = (tag: string) => (event: any) => {
    event.preventDefault();

    setTags({
      ...tags,
      list: tags.list.filter((t: string) => t !== tag),
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const client = new Client(auth);
    const { title, description, hours, status } = posting;
    const resp = await client.createPosting(
      title,
      description,
      hours,
      status,
      auth.bearerId!,
      tags.list
    );

    if (resp.error) {
      setPosting({ ...posting, errors: resp.error });
    } else {
      const pos = resp.data as Posting;
      history.push(`/postings/${pos.id}`);
    }
  };

  useEffect(() => {
    if (auth.type === 'Worker') {
      history.push('/postings');
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '500px',
        padding: '50px 20px',
        margin: '0 auto',
      }}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="filled-title"
            label="Title"
            name="title"
            margin="normal"
            variant="filled"
            fullWidth
            onChange={handleChange('title')}
          />

          <TextField
            id="filled-description"
            label="Description"
            name="description"
            margin="normal"
            variant="filled"
            fullWidth
            multiline
            minRows="10"
            onChange={handleChange('description')}
          />

          <TextField
            id="filled-hours"
            label="Hours"
            name="title"
            margin="normal"
            variant="filled"
            type="number"
            fullWidth
            onChange={handleChange('hours')}
          />

          {!!tags.list.length && (
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                justifyContent: 'left',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
                backgroundColor: 'transparent',
              }}
              component="ul"
            >
              {tags.list.map((tag) => (
                <ListItem key={`${tag}-${genUniqueId()}`}>
                  <Chip
                    label={tag}
                    variant="outlined"
                    color="primary"
                    onDelete={handleTagDelete(tag)}
                  />
                </ListItem>
              ))}
            </Paper>
          )}

          <TextField
            id="filled-basic"
            label="Tags"
            variant="filled"
            onChange={handleTagsChange}
            onKeyDown={handleTagsChange}
            value={tags.new}
            sx={{ width: '100%' }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              lineHeight: '40px',
            }}
          >
            Submit
          </Button>

          {posting.errors && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Posting was not created successfully — see error message below!
              <br />
              <br />
              <strong>{posting.errors}</strong>
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
}
