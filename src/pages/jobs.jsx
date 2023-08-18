import { List, Typography, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import JobListItem from "../components/jobListItem";
import { backendHost } from "../config";

function Jobs() {
  const jobs = useLoaderData();
  const [jobsData, setJobData] = useState(jobs);
  const navigator = useNavigate();
  //console.log(jobs);
  const handleDelete = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "x-auth-token": `${localStorage.getItem("session_key")}`,
      },
    };

    fetch(`${backendHost}/api/jobs/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        const temp = jobsData.filter((data) => {
          return data._id != id;
        });
        setJobData(temp);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };
  const handleAddNew = () => {
    navigator("./edit", {
      state: {
        data: {
          isNew: true,
          props: {},
        },
      },
    });
  };
  const handleEdit = (data) => {
    navigator("./edit", {
      state: {
        data: {
          isNew: false,
          props: data,
        },
      },
    });
  };
  const handleDetails = (data) => {
    navigator("./details", { state: { data } });
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item alignItems={"center"} justifyContent={"center"} paddingY={4}>
          <Typography
            component={"span"}
            fontWeight={"bold"}
            fontFamily={"Roboto"}
            fontSize={"16px"}
          >
            Available Jobs
          </Typography>
        </Grid>
        <Grid item flexGrow={1}></Grid>
        <Grid item margin={"auto"}>
          <Button
            variant="text"
            onClick={() => {
              handleAddNew();
            }}
          >
            Add Job
          </Button>
        </Grid>
      </Grid>
      <List sx={{ width: "100%" }} component="div">
        <JobListItem
          title={"Development"}
          jobsData={jobsData.filter((data) => data.category == 1)}
          handleEdit={(data) => handleEdit(data)}
          handleDelete={(data) => handleDelete(data)}
          handleDetails={(data) => handleDetails(data)}
        />
        <JobListItem
          title={"Engineering"}
          jobsData={jobsData.filter((data) => data.category == 2)}
          handleEdit={(data) => handleEdit(data)}
          handleDelete={(data) => handleDelete(data)}
          handleDetails={(data) => handleDetails(data)}
        />
        <JobListItem
          title={"Management"}
          jobsData={jobsData.filter((data) => data.category == 3)}
          handleEdit={(data) => handleEdit(data)}
          handleDelete={(data) => handleDelete(data)}
          handleDetails={(data) => handleDetails(data)}
        />
        <JobListItem
          title={"Creative"}
          jobsData={jobsData.filter((data) => data.category == 4)}
          handleEdit={(data) => handleEdit(data)}
          handleDelete={(data) => handleDelete(data)}
          handleDetails={(data) => handleDetails(data)}
        />
      </List>
    </React.Fragment>
  );
}

export async function JobsLoader({ url }) {
  //http://localhost:3000/api/jobs
  const session_key = localStorage.getItem("session_key");
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "x-auth-token": session_key },
    });
    if (res.status == 200) {
      const resDataJson = await res.json();
      console.log(resDataJson);
      return resDataJson.jobs;
    }
    return [];
  } catch (err) {
    return [];
  }

  // .then((res) => res.json())
  // .then((data) => {
  //   console.log(data.jobs);
  //   const jobsData = [];
  //   // eslint-disable-next-line no-unused-vars
  //   data.jobs.map((job, _) => {
  //     jobsData.push(job.title);
  //   });
  //   setJobData(jobsData);
  //   console.log(jobsData);
  // })
  // .catch((err) => console.error(err.message));
}

export default Jobs;
