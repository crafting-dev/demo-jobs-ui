import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Fetch } from '../../../adapters/fetch'
import { useAuth } from '../../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Postings = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()
  const [postings, setPostings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const handleFollowLinkPath = (id: number) => () => {
    history.push(`/postings/${id}`)
  }

  useEffect(() => {
    async function populatePostings(): Promise<void> {
      await Fetch('/postings', 'GET', auth.token)
        .then((response) => {
          setPostings(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    populatePostings().then(() => {
      setLoading(false)
    })
  }, [auth.token])

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginBottom: '50px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search jobs"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          component="a"
          href="https://github.com/crafting-dev/demo-jobs-ui"
          target="_blank"
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
        >
          <GitHubIcon />
        </IconButton>
      </Paper>

      {loading ? (
        <Stack spacing={0}>
          {['one', 'two', 'three', 'four', 'five'].map((key) => {
            return (
              <Card
                key={key}
                elevation={0}
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
                          sx={{ marginBottom: '10px', width: '300px' }}
                        >
                          <Skeleton />
                        </Typography>

                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={20}
                          sx={{ borderRadius: '30px' }}
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
                        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(
                          (chipKey) => {
                            return (
                              <ListItem key={chipKey}>
                                <Skeleton
                                  variant="rectangular"
                                  width={70}
                                  height={20}
                                  sx={{ borderRadius: '30px' }}
                                />
                              </ListItem>
                            )
                          }
                        )}
                      </Paper>

                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ margin: '20px 0' }}
                      >
                        <Skeleton />
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: '50px' }}
                      >
                        <Skeleton />
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: '300px' }}
                      >
                        <Skeleton />
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Stack>
      ) : (
        <Stack spacing={0}>
          {React.Children.toArray(
            postings.map((obj: any) => (
              <Card
                elevation={0}
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid #EEEEEE',
                }}
              >
                <CardActionArea onClick={handleFollowLinkPath(obj.id)}>
                  <CardContent>
                    <Stack spacing={0}>
                      <Typography gutterBottom variant="h5" component="div">
                        {obj.attributes.title}
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
                          {new Date().getDate() -
                            new Date(obj.attributes.createdAt).getDate()}{' '}
                          days ago by {obj.attributes.employer.name}
                        </Typography>

                        <Chip
                          label={obj.attributes.status}
                          size="small"
                          variant="outlined"
                          color={
                            obj.attributes.status === 'posted'
                              ? 'success'
                              : 'error'
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
                        {React.Children.toArray(
                          obj.attributes.tags
                            ?.split(', ')
                            .map((tag: string, i: number) => {
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
                        variant="body2"
                        color="text.primary"
                        noWrap
                        sx={{
                          margin: '20px 0',
                        }}
                      >
                        {obj.attributes.description}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Hours: {obj.attributes.hours}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Location: {obj.attributes.employer.location}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </Stack>
      )}

      {!postings.length && (
        <Typography
          color="secondary"
          variant="h2"
          sx={{ fontStyle: 'italic', marginLeft: '10px' }}
        >
          Nothing to see here!
        </Typography>
      )}
    </Box>
  )
}

export default Postings
