import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Fetch, Update } from '../../../adapters/fetch'
import { Application } from '../../../models/types'
import { useAuth } from '../../../contexts/auth'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const ViewApplication = (): JSX.Element => {
  const auth = useAuth()[0]
  const history = useHistory()

  const { id }: any = useParams()

  const [application, setApplication] = useState<Application>({
    id: 0,
    status: '',
    content: '',
    createdAt: '',
    tags: '',
    posting: undefined,
    worker: undefined,
  })

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const [status, setStatus] = useState('applied')
  const [submit, setSubmit] = useState<{
    success: boolean
    errors: string | false
  }>({
    success: false,
    errors: false,
  })

  const handleChangeStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStatus((event.target as HTMLInputElement).value)
  }

  const handleSubmitChangeStatus = async (): Promise<void> => {
    if (status === 'applied') {
      setSubmit({
        ...submit,
        errors: 'You have to make a hire/no-hire decision.',
      })
    } else {
      await Update(`/applications/${id}`, 'PUT', auth.token, { status })
        .then(() => {
          setSubmit({ ...submit, success: true })
          history.push(`/applications/${application.id}`)
        })
        .catch((error) => {
          setSubmit({ ...submit, errors: error.toString() })
        })
    }
  }

  useEffect(() => {
    async function getApplication(): Promise<void> {
      await Fetch(`/applications/${id}`, 'GET', auth.token).then((response) => {
        const newApplication: Application = {
          id: response.data.id,
          status: response.data.attributes.status,
          content: response.data.attributes.content,
          createdAt: response.data.attributes.createdAt,
          tags: response.data.attributes.tags,
          posting: response.data.attributes.posting,
          worker: response.data.attributes.worker,
        }
        setApplication(newApplication)
      })
    }

    getApplication()
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
        color="primary"
      >
        Application
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
                {application?.posting?.title}
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
                  {new Date(application?.createdAt).getDate() -
                    new Date().getDate()}{' '}
                  days ago by {application?.worker?.name}
                </Typography>

                <Chip
                  label={application?.status}
                  size="small"
                  variant="outlined"
                  color={
                    application?.status === 'expired' ||
                    application?.status === 'rejected'
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
                {React.Children.toArray(
                  application?.tags?.split(', ').map((tag: string) => {
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
                {application?.content}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Original job posting:{' '}
                <Link to={`/postings/${application?.posting?.id}`}>
                  {application?.posting?.title}
                </Link>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Applicant:{' '}
                <Link to={`/workers/${application?.worker?.id}`}>
                  {application?.worker?.name}
                </Link>
              </Typography>
            </Stack>

            {auth.type === 'Employer' && application.status === 'applied' && (
              <Stack spacing={1} sx={{ marginTop: '30px' }}>
                <Button
                  style={{ maxWidth: '200px' }}
                  variant="contained"
                  onClick={handleExpandClick}
                >
                  Process Application
                </Button>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Decision</FormLabel>
                      <RadioGroup
                        aria-label="decision"
                        name="controlled-radio-buttons-group"
                        value={status}
                        onChange={handleChangeStatus}
                      >
                        <FormControlLabel
                          value="hired"
                          control={<Radio />}
                          label="Hire"
                        />
                        <FormControlLabel
                          value="rejected"
                          control={<Radio />}
                          label="Reject"
                        />
                      </RadioGroup>
                      <Button
                        style={{ maxWidth: '100px', marginTop: '20px' }}
                        variant="outlined"
                        onClick={handleSubmitChangeStatus}
                      >
                        Submit
                      </Button>
                    </FormControl>
                  </CardContent>
                </Collapse>
                {submit.success && (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Thank you for submitting a decision!
                  </Alert>
                )}
                {submit.errors && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Your decision did not submit successfully — see error
                    message below!
                    <br />
                    <br />
                    <strong>Status: {submit.errors}</strong>
                  </Alert>
                )}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default ViewApplication
