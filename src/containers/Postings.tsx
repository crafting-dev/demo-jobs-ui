import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Fetch from "../adapters/Fetch";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../assets/themes/mui";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Postings() {
  const auth = useAuth()[0];
  const history = useHistory();

  const [postings, setPostings] = useState<any[]>([]);

  const handleFollowPathLink = (id: number) => () => {
    history.push(`/postings/${id}`);
  };

  useEffect(() => {
    async function populatePostings() {
      await Fetch("/postings", "GET", auth.token)
        .then((response) => {
          setPostings(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    populatePostings();
  }, []);

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
          {postings.map((obj: any) => (
            <Card
              elevation={0}
              sx={{
                background: "transparent",
                border: "1px solid #EEEEEE",
              }}
            >
              <CardActionArea onClick={handleFollowPathLink(obj.id)}>
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
                        sx={{ marginBottom: "10px" }}
                      >
                        Posted{" "}
                        {new Date().getDate() -
                          new Date(obj.attributes.createdAt).getDate()}{" "}
                        days ago by {obj.attributes.employer.name}
                      </Typography>

                      <Chip
                        label={obj.attributes.status}
                        size="small"
                        variant="outlined"
                        color={
                          obj.attributes.status === "posted"
                            ? "success"
                            : "error"
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
                      {obj.attributes.tags.split(", ").map((tag: string) => {
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
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Postings;
