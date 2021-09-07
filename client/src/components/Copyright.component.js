import { Link, Typography } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Powered by "}
      <Link color="inherit" href="http://microtrontechnologies.com/">
        Microtron Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
