import React, { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { backendHost } from "../config";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const formDefaultData = {
    firstName: "",
    lastName: "",
    email: "",
    passwd: "",
  };

  function handleSignIn(data) {
    setIsError(false);
    setLoading(true);
    fetch(`${backendHost}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        passwd: data.passwd,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error("Invalid username and password.");
        }

        return res.json();
      })
      .then((data) => {
        localStorage.setItem("session_key", data.token);
        localStorage.setItem("authenticated", true);
        navigate("/jobs");
        console.log(data.token);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
        console.error(err);
      });
    setLoading(false);
  }
  function handleSignUp(data) {
    setIsError(false);
    setLoading(true);
    fetch(`${backendHost}/api/user/register`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error("User already registered.");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("session_key", data.token);
        localStorage.setItem("authenticated", true);
        navigate("/jobs");
        console.log(data.token);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
        console.error(err);
      });
    setLoading(false);
  }
  return (
    <React.Fragment>
      <Grid
        item
        sx={{
          backgroundColor: "white",
          boxShadow: "3px 3px 15px rgba(0,0,0,.15)",
        }}
      >
        <Container
          component="div"
          maxWidth="xs"
          sx={{
            paddingBottom: "24px",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            my={6}
            sx={{ fontWeight: "bold" }}
          >
            WELCOME TO JOB PORTAL
          </Typography>
          <FormContainer
            defaultValues={formDefaultData}
            onSuccess={(data) => {
              isSignUp ? handleSignUp(data) : handleSignIn(data);
            }}
          >
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextFieldElement
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="First Name"
                      id="firstName"
                      label="First Name"
                      validation={{
                        required: {
                          value: true,
                          message: "required",
                        },
                        min: {
                          value: 3,
                          message: "Too short",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldElement
                      autoComplete="lname"
                      name="lastName"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Last Name"
                      id="lastName"
                      label="Last Name"
                      validation={{
                        required: {
                          value: true,
                          message: "required",
                        },
                        min: {
                          value: 3,
                          message: "Too short",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={12}>
                <TextFieldElement
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  placeholder="Email address"
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "not valid",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextFieldElement
                  autoComplete="password"
                  name="passwd"
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Minimum 8 digit. a-zA-Z0-9"
                  type="password"
                  id="password"
                  label="Password"
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]{8,30}$/,
                      message: "Minimum 8 digit. a-zA-Z0-9",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  loading={loading.toString()}
                >
                  {isSignUp ? "Sign Up" : "Log In"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                {isSignUp ? "Have an account? " : "Don't have an account? "}
                <Typography
                  component={"span"}
                  sx={{
                    color: "blue",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Click on signin!");
                    setIsSignUp(!isSignUp);
                  }}
                >
                  {isSignUp ? "Log in now" : "Sign Up"}
                </Typography>
              </Grid>
              {isError && (
                <Grid item xs={12} sm={12}>
                  <Typography align="left" sx={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </FormContainer>
        </Container>
      </Grid>
    </React.Fragment>
  );
}

export default SignIn;
