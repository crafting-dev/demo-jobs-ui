import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Fetch from "../adapters/Fetch";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";

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
  }, [auth.token]);

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        paddingTop: "100px",
      }}
    >
      {/* <Typography
        sx={{ marginBottom: "40px", paddingLeft: "20px" }}
        gutterBottom
        variant="h2"
        component="div"
      >
        Postings
      </Typography> */}

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "50px",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search jobs"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          component="a"
          href="https://github.com/crafting-dev/demo-jobs-ui"
          target="_blank"
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <GitHubIcon />
        </IconButton>
      </Paper>

      <Stack spacing={2}>
        {postings.map((obj: any) => (
          <Card
            elevation={1}
            key={obj.id}
            sx={{
              background: "#FFFFFF",
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
                      {new Date(obj.attributes.createdAt).getDate() -
                        new Date().getDate()}{" "}
                      days ago by {obj.attributes.employer.name}
                    </Typography>

                    <Chip
                      label={obj.attributes.status}
                      size="small"
                      variant="outlined"
                      color={
                        obj.attributes.status === "posted" ? "success" : "error"
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
                    {obj.attributes.tags?.split(", ").map((tag: string) => {
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
  );
}

export default Postings;
