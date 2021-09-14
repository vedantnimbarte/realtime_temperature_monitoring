import React from "react";
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";

const Budget = (props) => {
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Today&apos;s Temp. Hits
            </Typography>
            <Typography color="textPrimary" variant="h3">
              50
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Budget;
