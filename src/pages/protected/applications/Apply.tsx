import React, { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { Update } from '../../../adapters/fetch'
import { useAuth } from '../../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Apply = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()
  const { id }: any = useParams()

  const [application, setApplication] = useState<{
    content: string
    status: string
    posting: number | undefined
    worker: number | undefined
    errors: string | false
  }>({
    content: '',
    status: 'applied',
    posting: id,
    worker: auth.bearerId,
    errors: false,
  })

  const [tags, setTags] = useState<{ list: any; new: string }>({
    list: [],
    new: '',
  })

  const handleChange = (prop: any) => (e: { target: { value: any } }) => {
    setApplication({ ...application, [prop]: e.target.value })
  }

  const handleTagsChange = (e: any): void => {
    if (e.key === ' ') {
      e.preventDefault()
      tags.list.push(tags.new)
      setTags({ ...tags, new: '' })
    } else {
      setTags({ ...tags, new: e.target.value })
    }
  }

  const handleTagDelete = (tagToDelete: string) => (e: any) => {
    e.preventDefault()

    setTags({
      ...tags,
      list: tags.list.filter((tag: string) => tag !== tagToDelete),
    })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    await Update(`/applications`, 'POST', auth.token, {
      application: {
        content: application.content,
        status: application.status,
        posting_id: application.posting,
        worker_id: application.worker,
        tag_attributes: tags.list.join(', '),
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        history.push(`/applications/${response.data.id}`)
      })
      .catch((error) => {
        setApplication({ ...application, errors: error.message })
      })
  }

  const handleFollowLinkPath =
    (path: string) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault()
      history.push(path)
    }

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
          <Typography
            variant="h2"
            component="h2"
            color="primary"
            sx={{
              width: '100%',
              marginBottom: '30px',
            }}
          >
            Create Application
          </Typography>

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
                p: 0.5,
                m: 0,
                backgroundColor: 'transparent',
              }}
              component="ul"
            >
              {React.Children.toArray(
                tags.list.map((tag: string) => {
                  return (
                    <ListItem>
                      <Chip
                        label={tag}
                        variant="outlined"
                        color="primary"
                        onDelete={handleTagDelete(tag)}
                      />
                    </ListItem>
                  )
                })
              )}
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
  )
}

export default Apply
