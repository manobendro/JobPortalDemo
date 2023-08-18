import React from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

function JobLayout() {
  const navigator = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("session_key");
    localStorage.removeItem("authenticated");
    navigator("../");
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        style={{
          width: "100%",
          padding: "24px",
          top: 0,
          backgroundColor: "#24292e",
          color: "#fff",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        }}
      >
        <Container>
          <Grid container>
            <Grid item>
              <Typography variant="h4">JOB PORTAL</Typography>
            </Grid>
            <Grid item style={{ flexGrow: 1 }}></Grid>
            <Grid
              item
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ display: "flex" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  handleSignOut();
                }}
              >
                SIGN OUT
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Container
        component={"div"}
        sx={{
          width: "100%",
          color: "black",
        }}
      >
        <Outlet />
      </Container>
    </React.Fragment>
  );
}
export default JobLayout;
