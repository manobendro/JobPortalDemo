import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100vh" }}
      >
        <Outlet />
      </Grid>
    </React.Fragment>
  );
}

export default HomeLayout;
