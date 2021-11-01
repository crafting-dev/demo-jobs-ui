import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Fetch from "../adapters/Fetch";
import Profile from "../models/Profile";
import { Link } from "react-router-dom";

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
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        paddingTop: "100px",
      }}
    >
      <Stack spacing={2}>
        <Card
          elevation={1}
          sx={{
            background: "#FFFFFF",
          }}
        >
          <CardHeader title={profile?.name} subheader={profile?.email} />
          <CardMedia
            component="img"
            height="300"
            image={`${profile?.avatar}?s=1080`}
            alt={profile?.name}
          />
          <CardContent>
            <Stack spacing={2}>
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

              {profile?.postings && (
                <>
                  {!!profile.postings.length && (
                    <Typography
                      variant="h4"
                      color="text.primary"
                      sx={{ paddingTop: "20px" }}
                    >
                      My Postings
                    </Typography>
                  )}

                  {profile.postings.map((post: any) => {
                    return (
                      <Link
                        to={`/postings/${post.id}`}
                        key={post.id}
                        style={{
                          color: `${auth.type === "Employer" ? "#eb496a" : "#5a4fcf"}`,
                        }}
                      >
                        [{post.status}] {post.title}
                      </Link>
                    );
                  })}
                </>
              )}

              {profile?.applications && (
                <>
                  {!!profile.applications.length && (
                    <Typography
                      variant="h4"
                      color="text.primary"
                      sx={{ paddingTop: "20px" }}
                    >
                      My Applications
                    </Typography>
                  )}

                  {profile.applications.map((app: any) => {
                    return (
                      <Link to={`/applications/${app.id}`} key={app.id}>
                        [{app.status}] {app.title}
                      </Link>
                    );
                  })}
                </>
              )}

              <Typography variant="body1" color="text.primary">
                {profile?.type === "employer"
                  ? `My current location is ${profile?.location}.`
                  : `My current hourly rate is $${profile?.hourlyRate}/hr.`}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default Dashboard;
