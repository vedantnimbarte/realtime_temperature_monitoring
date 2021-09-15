import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

const Register = () => {
  const navigate = useNavigate();
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
      navigate("/app/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Temperature Monitoring Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          {/* <form> */}
          <Box sx={{ mb: 3 }}>
            <Typography color="textPrimary" variant="h2">
              Create new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create new account
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="First name"
            margin="normal"
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last name"
            margin="normal"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Mobile No"
            margin="normal"
            name="mobileNo"
            onChange={(event) => setMobile(event.target.value)}
            value={mobile}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Job Title"
            margin="normal"
            name="jobTitle"
            onChange={(event) => setJobTitle(event.target.value)}
            value={jobTitle}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => addUser()}
            >
              Sign up now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              variant="h6"
              underline="hover"
            >
              Sign in
            </Link>
          </Typography>
          {/* </form> */}
        </Container>
      </Box>
    </>
  );
};

export default Register;
