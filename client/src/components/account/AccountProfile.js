import React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { useCookies } from "react-cookie";

const user = {
  // avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: "Plant Manager",
  name: "Shyam Prassad",
};

const AccountProfile = (props) => {
  const [cookies, setCookies] = useCookies(["temp_monitoring_auth"]);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {cookies.user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${cookies.user.job_title}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
