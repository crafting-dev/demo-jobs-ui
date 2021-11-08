import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Posting } from '../../../models/types'
import { Fetch } from '../../../adapters/fetch'
import { useAuth } from '../../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const ViewPosting = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()

  const { id }: any = useParams()

  const [posting, setPosting] = useState<Posting>({
    id: 0,
    title: '',
    status: '',
    description: '',
    createdAt: '',
    hours: 0,
    tags: '',
    employer: undefined,
    applications: undefined,
  })

  const handleSubmit = (): void => {
    history.push(`/postings/${id}/apply`)
  }

  const handleFollowLinkPath =
    (path: string) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault()
      history.push(path)
    }

  useEffect(() => {
    async function getPosting(): Promise<void> {
      await Fetch(`/postings/${id}`, 'GET', auth.token).then((response) => {
        const newPosting: Posting = {
          id: response.data.id,
          title: response.data.attributes.title,
          status: response.data.attributes.status,
          description: response.data.attributes.description,
          createdAt: response.data.attributes.createdAt,
          hours: response.data.attributes.hours,
          tags: response.data.attributes.tags,
          employer: response.data.attributes.employer,
          applications: response.data.attributes.applications,
        }
        setPosting(newPosting)
      })
    }

    getPosting()
  }, [id, auth.token])

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <Typography
        sx={{ marginBottom: '40px', paddingLeft: '20px' }}
        gutterBottom
        variant="h2"
        component="div"
      >
        Posting
      </Typography>

      <Stack spacing={2}>
        <Card
          elevation={1}
          sx={{
            background: '#FFFFFF',
            border: '1px solid #EEEEEE',
          }}
        >
          <CardContent>
            <Stack spacing={0}>
              <Typography gutterBottom variant="h5" component="div">
                {posting?.title}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: '10px' }}
                >
                  Posted{' '}
                  {new Date(posting.createdAt).getDate() - new Date().getDate()}{' '}
                  days ago by {posting?.employer?.name}
                </Typography>

                <Chip
                  label={posting?.status}
                  size="small"
                  variant="outlined"
                  color={posting?.status === 'posted' ? 'success' : 'error'}
                />
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  paddingLeft: 0,
                  p: 0.5,
                  m: 0,
                  backgroundColor: 'transparent',
                }}
                component="ul"
              >
                {React.Children.toArray(
                  posting?.tags?.split(', ').map((tag: string) => {
                    return (
                      <ListItem>
                        <Chip
                          label={tag}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </ListItem>
                    )
                  })
                )}
              </Paper>

              <Typography
                paragraph
                color="text.primary"
                sx={{ margin: '20px 0' }}
              >
                {posting?.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Hours: {posting?.hours}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Location: {posting?.employer?.location}
              </Typography>
            </Stack>

            {!!posting.applications?.length && (
              <Stack sx={{ marginTop: '30px' }}>
                <Typography gutterBottom variant="h6" component="div">
                  Applications
                </Typography>
                {React.Children.toArray(
                  posting.applications.map((app) => (
                    <Button
                      variant="text"
                      component="a"
                      style={{ display: 'block' }}
                      onClick={handleFollowLinkPath(`/applications/${app.id}`)}
                    >
                      [{app.status}] {app.name}
                    </Button>
                  ))
                )}
              </Stack>
            )}

            {auth.type === 'Worker' && (
              <Stack sx={{ marginTop: '30px' }}>
                <Button
                  style={{ maxWidth: '200px' }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Apply
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default ViewPosting
