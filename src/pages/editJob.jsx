import React, { useState } from "react";
import { Grid, IconButton, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  SelectElement,
} from "react-hook-form-mui";
import { useLocation, useNavigate } from "react-router-dom";
import { backendHost } from "../config";

function EditJob() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  let formDefault = {
    jobCategory: 1,
    jobTitle: "",
    deadline: "",
    description: "",
  };

  let isNew = true;
  let jobData = {};

  if (state) {
    isNew = state.data.isNew;
  }
  if (!isNew) {
    jobData = state.data.props;
    formDefault = {
      jobCategory: jobData.category,
      jobTitle: jobData.title,
      deadline: jobData.deadline,
      description: jobData.description,
    };
  }
  //console.log(jobData);
  const handleSubmit = (data) => {
    setError(false);
    setSuccess(false);

    if (isNew) {
      fetch(`${backendHost}/api/jobs`, {
        method: "POST",
        headers: {
          "x-auth-token": `${localStorage.getItem("session_key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.jobTitle,
          description: data.description,
          category: data.jobCategory,
          deadline: data.deadline,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage("Job post added!");
          setSuccess(true);
          console.log(data);
        })
        .catch((err) => {
          setMessage("Failed to create job post!");
          setError(true);
          console.error(err.message);
        });
    } else {
      fetch(`${backendHost}/api/jobs/${jobData._id}`, {
        method: "PUT",
        headers: {
          "x-auth-token": `${localStorage.getItem("session_key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.jobTitle,
          description: data.description,
          category: data.jobCategory,
          deadline: data.deadline,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage("Job post Updated!");
          setSuccess(true);
          console.log(data);
        })
        .catch((err) => {
          setMessage("Failed to update job post!");
          setError(true);
          console.error(err.message);
        });
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item paddingY={2}>
          <IconButton
            onClick={() => {
              navigate("../");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>
      <FormContainer
        defaultValues={formDefault}
        onSuccess={(data) => {
          handleSubmit(data);
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <SelectElement
              label="Job Category"
              placeholder="Job Category"
              name="jobCategory"
              required
              fullWidth
              options={[
                { id: 1, label: "Development" },
                { id: 2, label: "Engineering" },
                { id: 3, label: "Management" },
                { id: 4, label: "Creative" },
              ]}
            />
          </Grid>
          <Grid item sm={6}>
            <TextFieldElement
              label="Job Title"
              placeholder="Job Title"
              name="jobTitle"
              required
              fullWidth
            ></TextFieldElement>
          </Grid>
          <Grid item sm={6}>
            <TextFieldElement
              label="Application Deadline"
              placeholder="dd-mm-yyyy"
              name="deadline"
              required
              fullWidth
            ></TextFieldElement>
          </Grid>
          <Grid item sm={12}>
            <TextareaAutosizeElement
              label="Job Description"
              placeholder="Job Description"
              name="description"
              rows={6}
              required
              fullWidth
            ></TextareaAutosizeElement>
          </Grid>
          <Grid item sm={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Post
            </Button>
          </Grid>
          {(success || error) && (
            <Grid item>
              <Typography color={success ? "green" : "red"}>
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </FormContainer>
    </React.Fragment>
  );
}
export default EditJob;
