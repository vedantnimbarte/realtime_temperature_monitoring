import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useCookies } from "react-cookie";

const AccountProfileDetails = (props) => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "temp_monitoring_auth",
  ]);
  const [firstName, setFirstName] = useState(cookies.user.name.split(" ")[0]);
  const [lastName, setLastName] = useState(cookies.user.name.split(" ")[1]);
  const [email, setEmail] = useState(cookies.user.email);
  const [mobile, setMobile] = useState(cookies.user.mobile_no);
  const [jobTitle, setJobTitle] = useState(cookies.user.job_title);
  const [success, setSuccess] = useState(0);
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const updateAccountDetails = async () => {
    setSuccess();
    setError();
    const userData = {
      sr_no: cookies.user.sr_no,
      name: `${firstName} ${lastName}`,
      email: email,
      mobile_no: mobile,
      job_title: jobTitle,
    };
    const response = await fetch("http://localhost:8000/api/user/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.success === "1") {
      setSuccess(1);
      removeCookie("user");
      setCookies("user", JSON.stringify(result.usersData[0]), {
        path: "/",
      });
      setTimeout(() => {
        setSuccess(0);
      }, 2000);
    }
    if (result.success === "0") {
      setError(1);
      setErrorMsg("Something Went Wrong");
      setTimeout(() => {
        setError();
      }, 2000);
    }
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        {success ? (
          <Typography sx={{ color: "green" }}>
            Account details updated successfully
          </Typography>
        ) : error ? (
          <Typography sx={{ color: "red" }}>{errorMsg}</Typography>
        ) : (
          ""
        )}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={(event) => setFirstName(event.target.value)}
                required
                value={firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={(event) => setLastName(event.target.value)}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={(event) => setMobile(event.target.value)}
                type="number"
                value={mobile}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="job title"
                onChange={(event) => setJobTitle(event.target.value)}
                required
                value={jobTitle}
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateAccountDetails()}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
