import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import Application from "../models/Application";
import Fetch from "../adapters/Fetch";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ViewApplication() {
  const auth = useAuth()[0];

  const { id }: any = useParams();

  const [application, setApplication] = useState<Application>({
    id: 0,
    status: "",
    content: "",
    createdAt: "",
    tags: "",
    posting: undefined,
    worker: undefined,
  });

  useEffect(() => {
    async function getApplication() {
      await Fetch(`/applications/${id}`, "GET", auth.token).then((response) => {
        const application: Application = {
          id: response.data.id,
          status: response.data.attributes.status,
          content: response.data.attributes.content,
          createdAt: response.data.attributes.createdAt,
          tags: response.data.attributes.tags,
          posting: response.data.attributes.posting,
          worker: response.data.attributes.worker,
        };
        setApplication(application);
      });
    }

    getApplication();
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
        <Typography
          sx={{ marginBottom: "40px", paddingLeft: "20px" }}
          gutterBottom
          variant="h2"
          component="div"
        >
          Application
        </Typography>

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
                    sx={{ marginBottom: "10px" }}
                  >
                    Applied{" "}
                    {new Date().getDate() -
                      new Date(application?.createdAt).getDate()}{" "}
                    days ago by {application?.worker?.name}
                  </Typography>

                  <Chip
                    label={application?.status}
                    size="small"
                    variant="outlined"
                    color={
                      application?.status === "error" ||
                      application?.status === "rejected"
                        ? "error"
                        : "success"
                    }
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
                  {application?.tags?.split(", ").map((tag: string) => {
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
                  {application?.content}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Application created by:{" "}
                  <Link to={`/workers/${application?.worker?.id}`}>
                    {application?.worker?.name}
                  </Link>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Original job posting:{" "}
                  <Link to={`/postings/${application?.posting?.id}`}>
                    {application?.posting?.title}
                  </Link>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default ViewApplication;
