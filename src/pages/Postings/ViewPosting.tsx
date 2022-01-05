import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import { Client } from 'common/backend-client';
import { statusColorHex } from 'common/helpers';
import { useAuth } from 'common/hooks';
import { Application, Posting } from 'common/types';
import { StyledTableRow } from 'components/common';
import { LoadingCard, PostingCard } from 'pages/Postings/components';
import { colors } from 'styles';

export function ViewPosting() {
  const auth = useAuth()[0];
  const history = useHistory();
  const { id }: any = useParams();

  const [posting, setPosting] = useState<Posting>();
  const [applications, setApplications] = useState<Application[]>();
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickLink =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      history.push(path);
    };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    history.push(`/postings/${id}/apply`);
  };

  useEffect(() => {
    async function getPosting() {
      const client = new Client(auth);
      const resp = await client.getPosting(id as string);
      if (!resp.error) {
        setPosting(resp.data as Posting);
      }
    }

    getPosting();
  }, [id, auth.token]);

  useEffect(() => {
    async function populateApplications() {
      const client = new Client(auth);
      const resp = await client.getApplications();
      if (!resp.error) {
        setApplications(resp.data as Application[]);
      }
    }

    populateApplications();
  }, [auth.token]);

  useEffect(() => {
    if (applications) {
      const application = applications.find(
        (app) => `${app.posting?.id}` === `${id}`
      );
      if (application) setApplied(true);
      setLoading(false);
    }
  }, [id, applications]);

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '50px 20px',
      }}
    >
      <Stack spacing={2}>
        {loading && <LoadingCard />}

        {!loading && posting && <PostingCard posting={posting} />}

        {auth.type === 'Employer' &&
          !loading &&
          !!posting?.applications?.length && (
            <Card
              elevation={1}
              sx={{
                marginTop: '20px',
                background: colors.white[100],
              }}
            >
              <CardHeader
                title="Applications"
                subheader="A list of your job applicants for this posting"
              />
              <CardContent>
                <TableContainer>
                  <Table sx={{ width: '100%' }}>
                    <TableBody>
                      {applications!.map((app) => (
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
                          <TableCell>{app.name}</TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

        {auth.type === 'Worker' && !loading && !applied && (
          <Button
            style={{ maxWidth: '200px' }}
            variant="contained"
            onClick={handleSubmit}
          >
            Apply
          </Button>
        )}
      </Stack>
    </Box>
  );
}
