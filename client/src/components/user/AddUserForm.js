import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Alert,
  AlertTitle,
} from "@material-ui/core";
import { Navigate } from "react-router-dom";

const AddUserForm = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [mobile, setMobile] = useState();

  const [success, setSuccess] = useState(0);

  const addUser = async () => {
    const userData = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      mobile_no: mobile,
      job_title: jobTitle,
    };
    const response = await fetch("http://localhost:8000/api/user/addUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.success == "1") {
      setSuccess(1);

      setTimeout(() => {
        setSuccess(0);
      }, 2000);
    }
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Add New User" />
        {success ? (
          <Box>
            <Divider />
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              User{" "}
              <strong>
                {firstName} {lastName}{" "}
              </strong>
              added successfully
            </Alert>
            <Divider />
          </Box>
        ) : (
          ""
        )}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="job-title"
                required
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mobile No"
                name="mobile"
                required
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={() => addUser()}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddUserForm;
