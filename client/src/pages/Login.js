import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Powered by Microtron Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  const [cookies, setCookies] = useCookies(["temp_monitoring_auth"]);

  const getDataFromApi = async () => {
    setError();
    setSuccess();
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const result = await response.json();
    if (result.success == "1") {
      setCookies("user", JSON.stringify(result.usersData[0]), {
        path: "/",
      });
      navigate("/app/dashboard", { replace: true });
      setSuccess(1);
    } else {
      setSuccess(0);
      setTimeout(() => {
        setSuccess();
      }, 4000);
      setError(
        "User not available with this credentails, Please check your email and password"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src="/static/logo-dark.jpeg"
          style={{ height: 80, width: 80, margin: 5 }}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {success == 0 ? (
          <Typography component="h1" variant="h5" sx={{ color: "red" }}>
            {error}
          </Typography>
        ) : (
          ""
        )}
        {/* <form className={classes.form} noValidate> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => getDataFromApi()}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        {/* </form> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
