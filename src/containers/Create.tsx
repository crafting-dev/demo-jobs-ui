import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import { Update } from '../adapters/Fetch'
import { useAuth } from '../contexts/authContext'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

function Create() {
  const auth = useAuth()[0]
  const history = useHistory()

  const [posting, setPosting] = useState<{
    title: string
    description: string
    hours: number
    status: string
    errors: string | false
  }>({
    title: '',
    description: '',
    hours: 0,
    status: 'posted',
    errors: false,
  })

  const [tags, setTags] = useState<{ list: any; new: string }>({
    list: [],
    new: '',
  })

  const handleChange = (prop: any) => (e: { target: { value: any } }) => {
    setPosting({ ...posting, [prop]: e.target.value })
  }

  const handleTagsChange = (e: any) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await Update(`/postings`, 'POST', auth.token, {
      posting: {
        title: posting.title,
        description: posting.description,
        hours: posting.hours,
        status: posting.status,
        employer_id: auth.bearerId,
        tag_attributes: tags.list.join(', '),
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        history.push(`/postings/${response.data.id}`)
      })
      .catch((error) => {
        setPosting({ ...posting, errors: error.toString() })
      })
  }

  return (
    <Box
      sx={{
        maxWidth: '500px',
        paddingTop: '100px',
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
          <Typography
            variant="h2"
            component="h2"
            color="inherit"
            sx={{
              width: '100%',
              marginBottom: '30px',
            }}
          >
            Create Post
          </Typography>

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
                p: 0.5,
                m: 0,
                backgroundColor: 'transparent',
              }}
              component="ul"
            >
              {tags.list.map((tag: string) => {
                return (
                  <ListItem key={tag}>
                    <Chip
                      label={tag}
                      variant="outlined"
                      color="primary"
                      onDelete={handleTagDelete(tag)}
                    />
                  </ListItem>
                )
              })}
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
  )
}

export default Create
