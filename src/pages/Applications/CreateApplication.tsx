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
import { useHistory, useParams } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { genUniqueId } from 'common/helpers';
import { useAuth } from 'common/hooks';
import { Application } from 'common/types';
import { ListItem } from 'components/common';

export function CreateApplication() {
  const auth = useAuth()[0];
  const history = useHistory();
  const { id }: any = useParams();

  const [application, setApplication] = useState<{
    content: string;
    status: string;
    posting?: number;
    worker?: number;
    errors?: string;
  }>({
    content: '',
    status: 'applied',
    posting: id,
    worker: auth.bearerId,
  });
  const [tags, setTags] = useState<{ list: string[]; new: string }>({
    list: [],
    new: '',
  });

  const handleChange = (prop: string) => (event: any) => {
    setApplication({ ...application, [prop]: event.target.value });
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

  const handleFollowLinkPath =
    (path: string) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault();
      history.push(path);
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const client = new Client(auth);
    const resp = await client.createApplication(
      application.content,
      application.status,
      application.posting!,
      application.worker!,
      tags.list
    );

    if (resp.error) {
      setApplication({ ...application, errors: resp.error });
    } else {
      const app = resp.data as Application;
      history.push(`/applications/${app.id}`);
    }
  };

  useEffect(() => {
    const client = new Client(auth);
    client.getApplications().then((resp) => {
      if (resp.data) {
        const apps = resp.data as Application[];
        const app = apps.find((a) => `${a.posting?.id}` === `${id}`);
        if (app) {
          history.push('/applications');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (auth.type === 'Employer') {
      history.push('/applications');
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
          alignItems="left"
          spacing={2}
        >
          <Button
            sx={{ display: 'block', left: 0 }}
            component="a"
            onClick={handleFollowLinkPath(`/postings/${application.posting}`)}
          >
            Original job post
          </Button>

          <TextField
            id="filled-content"
            label="Content"
            name="content"
            margin="normal"
            variant="filled"
            fullWidth
            multiline
            minRows="15"
            onChange={handleChange('content')}
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
              {tags.list.map((tag: string) => (
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
            Submit Application
          </Button>

          {application.errors && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Application was not created successfully — see error message
              below!
              <br />
              <br />
              <strong>{application.errors}</strong>
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
}
