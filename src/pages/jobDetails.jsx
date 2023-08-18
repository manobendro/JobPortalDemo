import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function JobDetails() {
  const location = useLocation();
  const navigator = useNavigate();
  if (!location.state) {
    return <Navigate to={"../"}/>;
  }
  const jobData = location.state.data;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item paddingY={2}>
          <IconButton
            onClick={() => {
              navigator("../");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography fontWeight={"bold"} fontSize={"16px"}>
            {jobData.title}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography fontStyle={"italic"}>
            Department: {getCategory(jobData.category)}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography fontStyle={"italic"}>
            Deadline: {jobData.deadline}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          {jobData.description}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function getCategory(id) {
  switch (id) {
    case 1:
      return "Development";
    case 2:
      return "Engineering";
    case 3:
      return "Management";
    case 4:
      return "Creative";
    default:
      return "Unknown";
  }
}
export default JobDetails;
