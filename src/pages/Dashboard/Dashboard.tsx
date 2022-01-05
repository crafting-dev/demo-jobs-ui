import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { statusColorHex } from 'common/helpers';
import { useAuth } from 'common/hooks';
import { Profile } from 'common/types';
import { ListItem, StyledTableRow } from 'components/common';
import { colors } from 'styles';

export function Dashboard() {
  const auth = useAuth()[0];
  const history = useHistory();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const handleClickLink =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(path);
    };

  useEffect(() => {
    async function getProfile() {
      const client = new Client(auth);
      const newProfile = await client.getProfile();
      if (!newProfile.error) setProfile(newProfile.data! as Profile);
    }

    getProfile().then(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <Stack spacing={2}>
        {loading && (
          <>
            <Card
              elevation={1}
              sx={{
                background: colors.white[100],
              }}
            >
              <Skeleton
                sx={{ height: '40px' }}
                animation="wave"
                variant="rectangular"
              />

              <Skeleton
                sx={{ height: '300px' }}
                animation="wave"
                variant="rectangular"
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
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(
                      (chipKey) => (
                        <ListItem key={chipKey}>
                          <Skeleton
                            variant="rectangular"
                            width={70}
                            height={20}
                            sx={{ borderRadius: '30px' }}
                          />
                        </ListItem>
                      )
                    )}
                  </Paper>

                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ padding: '0 10px' }}
                  >
                    <Skeleton />
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={1}
              sx={{
                marginTop: '20px',
                background: colors.white[100],
              }}
            >
              <Skeleton
                sx={{ height: '40px' }}
                animation="wave"
                variant="rectangular"
              />
              <CardContent>
                <Stack spacing={2}>
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(
                    (post) => (
                      <Button
                        key={post}
                        variant="text"
                        component="a"
                        style={{ display: 'block' }}
                      >
                        <Skeleton />
                      </Button>
                    )
                  )}
                </Stack>
              </CardContent>
            </Card>
          </>
        )}

        {!loading && (
          <>
            <Card
              elevation={1}
              sx={{
                background: colors.white[100],
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
                    {Array.from(profile!.tags!.split(', ')).map((tag) => (
                      <ListItem
                        key={`${tag}-${Math.random().toLocaleString()}`}
                      >
                        <Chip
                          label={tag}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </ListItem>
                    ))}
                  </Paper>

                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ padding: '0 10px' }}
                  >
                    {profile?.type === 'employer'
                      ? `Your location is currently set to ${profile?.location}.`
                      : `Your current hourly rate is ${profile?.hourlyRate}/hr.`}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            {profile && !!profile.postings?.length && (
              <Card
                elevation={1}
                sx={{
                  marginTop: '20px',
                  background: colors.white[100],
                }}
              >
                <CardHeader
                  title="Postings"
                  subheader="A list of all your job postings"
                />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ width: '100%' }}>
                      <TableBody>
                        {profile.postings.map((post) => (
                          <StyledTableRow
                            key={post.id}
                            sx={{ cursor: 'pointer' }}
                            onClick={handleClickLink(`/postings/${post.id}`)}
                          >
                            <TableCell
                              sx={{ color: statusColorHex(post.status!) }}
                            >
                              {post.status}
                            </TableCell>
                            <TableCell>{post.title}</TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {profile && !!profile.applications?.length && (
              <Card
                elevation={1}
                sx={{
                  marginTop: '20px',
                  background: colors.white[100],
                }}
              >
                <CardHeader
                  title="Applications"
                  subheader="A list of all your job applications"
                />
                <CardContent>
                  <TableContainer>
                    <Table sx={{ width: '100%' }}>
                      <TableBody>
                        {profile.applications!.map((app) => (
                          <StyledTableRow
                            key={app.id}
                            sx={{ cursor: 'pointer' }}
                            onClick={handleClickLink(`/applications/${app.id}`)}
                          >
                            <TableCell
                              sx={{ color: statusColorHex(app.status!) }}
                            >
                              {app.status}
                            </TableCell>
                            <TableCell>{app.title}</TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
