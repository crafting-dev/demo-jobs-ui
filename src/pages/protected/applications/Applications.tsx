import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { Fetch } from '../../../adapters/fetch'
import { useAuth } from '../../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Applications = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()

  const [applications, setApplications] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const handleFollowPathLink = (id: number) => () => {
    history.push(`/applications/${id}`)
  }

  useEffect(() => {
    async function populateApplications(): Promise<void> {
      await Fetch('/applications', 'GET', auth.token).then((response) => {
        setApplications(response.data)
      })
    }

    populateApplications().then(() => {
      setLoading(false)
    })
  }, [auth.token])

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        paddingTop: '100px',
      }}
    >
      <Typography
        sx={{ marginBottom: '40px', paddingLeft: '20px' }}
        gutterBottom
        variant="h2"
        component="div"
      >
        Applications
      </Typography>

      {loading ? (
        <Stack spacing={2}>
          <Card
            elevation={1}
            sx={{
              background: '#FFFFFF',
              border: '1px solid #EEEEEE',
            }}
          >
            <CardActionArea>
              <CardContent>
                <Stack spacing={0}>
                  <Typography gutterBottom variant="h5" component="div">
                    <Skeleton />
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
                      <Skeleton />
                    </Typography>

                    <Chip
                      label={<Skeleton />}
                      size="small"
                      variant="outlined"
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
                    <Skeleton />
                  </Paper>

                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ margin: '20px 0' }}
                  >
                    <Skeleton />
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <Skeleton />
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <Skeleton />
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      ) : (
        <Stack spacing={2}>
          {applications.map((obj: any) => (
            <Card
              elevation={1}
              key={obj.id}
              sx={{
                background: '#FFFFFF',
                border: '1px solid #EEEEEE',
              }}
            >
              <CardActionArea onClick={handleFollowPathLink(obj.id)}>
                <CardContent>
                  <Stack spacing={0}>
                    <Typography gutterBottom variant="h5" component="div">
                      {obj.attributes.posting.title}
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
                        Applied{' '}
                        {new Date(obj.attributes.createdAt).getDate() -
                          new Date().getDate()}{' '}
                        days ago
                      </Typography>

                      <Chip
                        label={obj.attributes.status}
                        size="small"
                        variant="outlined"
                        color={
                          obj.attributes.status === 'expired' ||
                          obj.attributes.status === 'rejected'
                            ? 'error'
                            : 'success'
                        }
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
                      {obj.attributes.tags?.split(', ').map((tag: string) => {
                        return (
                          <ListItem key={tag}>
                            <Chip
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          </ListItem>
                        )
                      })}
                    </Paper>

                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ margin: '20px 0' }}
                    >
                      {obj.attributes.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Application was created by:{' '}
                      {auth.type === 'Worker'
                        ? 'me'
                        : obj.attributes.worker.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Original posting:{' '}
                      <Link to={`/postings/${obj.attributes.posting.id}`}>
                        {obj.attributes.posting.title}
                      </Link>
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default Applications