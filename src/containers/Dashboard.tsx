import React, { useEffect, useState } from "react";
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
import Fetch from "../adapters/Fetch";
import Profile from "../models/Profile";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Dashboard() {
  const auth = useAuth()[0];

  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    email: "",
    location: "",
    hourlyRate: 0,
    tags: "",
    avatar: "",
    type: "",
    postings: undefined,
    applications: undefined,
  });

  useEffect(() => {
    async function getProfile() {
      await Fetch(
        `/${auth.type?.toLocaleLowerCase()}s/${auth.bearerId}`,
        "GET",
        auth.token
      ).then((response) => {
        const profile: Profile = {
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
        };
        setProfile(profile);
      });
    }

    getProfile();
  }, [auth.bearerId, auth.type, auth.token]);

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
          Dashboard
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
                  {profile?.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "10px" }}
                >
                  {profile?.email}
                </Typography>

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
                  {profile?.tags?.split(", ").map((tag: string) => {
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

                <Typography variant="body2" color="text.secondary">
                  {profile?.type === "employer"
                    ? `Location:  ${profile?.location}`
                    : `Hourly Rate: ${profile?.hourlyRate}`}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
