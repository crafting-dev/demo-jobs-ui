import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Fetch } from '../../adapters/fetch'
import { Profile } from '../../models/types'
import { useAuth } from '../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Dashboard = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()

  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: '',
    email: '',
    location: '',
    hourlyRate: 0,
    tags: '',
    avatar: '',
    type: '',
    postings: undefined,
    applications: undefined,
  })

  const handleFollowLinkPath =
    (path: string) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault()
      history.push(path)
    }

  useEffect(() => {
    async function getProfile(): Promise<void> {
      await Fetch(
        `/${auth.type?.toLocaleLowerCase()}s/${auth.bearerId}`,
        'GET',
        auth.token
      ).then((response) => {
        const newProfile: Profile = {
          id: response.data.id,
          name: response.data.attributes.name,
          email: response.data.attributes.email,
          location: response.data.attributes.location,
          hourlyRate: response.data.attributes.hourlyRate,
          type: response.data.type,
          avatar: response.data.attributes.avatar,
          tags: response.data.attributes.tags,
          postings: response.data.attributes.postings,
          applications: response.data.attributes.applications,
        }
        setProfile(newProfile)
      })
    }

    getProfile()
  }, [auth.bearerId, auth.type, auth.token])

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <Stack spacing={2}>
        <Card
          elevation={1}
          sx={{
            background: '#FFFFFF',
          }}
        >
          <CardHeader title={profile?.name} subheader={profile?.email} />
          <CardMedia
            component="img"
            height="300"
            image={`${profile?.avatar}&s=1080`}
            alt={profile?.name}
          />
          <CardContent>
            <Stack spacing={2}>
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
                  profile?.tags?.split(', ').map((tag: string) => {
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

              {profile?.postings && (
                <div>
                  {!!profile.postings.length && (
                    <Typography
                      variant="h4"
                      color="text.primary"
                      sx={{ padding: '20px 0' }}
                    >
                      My Postings
                    </Typography>
                  )}

                  {React.Children.toArray(
                    profile.postings.map((post: any) => {
                      return (
                        <Button
                          variant="text"
                          component="a"
                          style={{ display: 'block' }}
                          onClick={handleFollowLinkPath(`/postings/${post.id}`)}
                        >
                          [{post.status}] {post.title}
                        </Button>
                      )
                    })
                  )}
                </div>
              )}

              {profile?.applications && (
                <div>
                  {!!profile.applications.length && (
                    <Typography
                      variant="h4"
                      color="text.primary"
                      sx={{ padding: '20px 0' }}
                    >
                      My Applications
                    </Typography>
                  )}

                  {React.Children.toArray(
                    profile.applications.map((app: any) => {
                      return (
                        <Button
                          key={app.id}
                          variant="text"
                          component="a"
                          style={{ display: 'block' }}
                          onClick={handleFollowLinkPath(
                            `/applications/${app.id}`
                          )}
                        >
                          [{app.status}] {app.title}
                        </Button>
                      )
                    })
                  )}
                </div>
              )}

              <Typography variant="body1" color="text.primary">
                {profile?.type === 'employer'
                  ? `Current location is ${profile?.location}.`
                  : `Current hourly rate is $${profile?.hourlyRate}/hr.`}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default Dashboard
