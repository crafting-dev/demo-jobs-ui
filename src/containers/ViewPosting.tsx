import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../assets/themes/mui";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Posting from "../models/Posting";
import Fetch from "../adapters/Fetch";
import Button from "@mui/material/Button";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ViewPosting() {
  const auth = useAuth()[0];
  const history = useHistory();

  const { id }: any = useParams();

  const [posting, setPosting] = useState<Posting>({
    id: 0,
    title: "",
    status: "",
    description: "",
    createdAt: "",
    hours: 0,
    tags: "",
    employer: undefined,
    applications: undefined,
  });

  const handleSubmit = () => {
    history.push(`/postings/${id}/apply`);
  };

  useEffect(() => {
    async function getPosting() {
      await Fetch(`/postings/${id}`, "GET", auth.token).then((response) => {
        const posting: Posting = {
          id: response.data.id,
          title: response.data.attributes.title,
          status: response.data.attributes.status,
          description: response.data.attributes.description,
          createdAt: response.data.attributes.createdAt,
          hours: response.data.attributes.hours,
          tags: response.data.attributes.tags,
          employer: response.data.attributes.employer,
          applications: response.data.attributes.applications,
        };
        setPosting(posting);
      });
    }

    getPosting();
  }, [id, auth.token]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          paddingTop: "100px",
        }}
      >
        <Stack spacing={2}>
          <Card
            elevation={0}
            sx={{
              background: "transparent",
              border: "1px solid #EEEEEE",
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
                    sx={{ marginBottom: "10px" }}
                  >
                    Posted{" "}
                    {new Date().getDate() -
                      new Date(posting.createdAt).getDate()}{" "}
                    days ago by {posting?.employer?.name}
                  </Typography>

                  <Chip
                    label={posting?.status}
                    size="small"
                    variant="outlined"
                    color={posting?.status === "posted" ? "success" : "error"}
                  />
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    flexWrap: "wrap",
                    listStyle: "none",
                    paddingLeft: 0,
                    p: 0.5,
                    m: 0,
                    backgroundColor: "transparent",
                  }}
                  component="ul"
                >
                  {posting?.tags?.split(", ").map((tag: string) => {
                    return (
                      <ListItem key={tag}>
                        <Chip
                          label={tag}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </ListItem>
                    );
                  })}
                </Paper>

                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ margin: "20px 0" }}
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

              {posting.applications && (
                <Stack sx={{ marginTop: "30px" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Applications
                  </Typography>
                  {posting.applications.map((app) => (
                    <Link to={`/applications/${app.id}`}>
                      Applicant: {app.name}, status: {app.status}
                    </Link>
                  ))}
                </Stack>
              )}

              {auth.type === "Worker" && (
                <Stack sx={{ marginTop: "30px" }}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Apply
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default ViewPosting;