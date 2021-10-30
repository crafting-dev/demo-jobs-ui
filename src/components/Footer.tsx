import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Link from "@mui/material/Link";
import theme from "../assets/themes/mui";

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        spacing={1}
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            borderTop: "1px solid #EEEEEE",
            textAlign: "center",
            height: "100px",
            marginTop: "100px",
            paddingTop: "40px",
          }}
        >
          Copyright &copy; {new Date().getFullYear()},{" "}
          <Link href="https://github.com/crafting-dev">crafting-dev</Link>.
        </Typography>
      </Stack>
    </ThemeProvider>
  );
}

export default Footer;
