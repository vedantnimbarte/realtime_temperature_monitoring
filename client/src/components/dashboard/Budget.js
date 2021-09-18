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
import moment from "moment";

const Budget = (props) => {
  const [todayTemperatureCount, setTodayTemperatureCount] = React.useState(0);

  React.useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    const date = moment().format("DD MMM YYYY");
    const response = await fetch("http://localhost:8000/api/getTemp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ device_id: "TMS_101" }),
    });
    const result = await response.json();
    let count = 0;
    if (result.success === "1") {
      for (const index in result.temperatureData) {
        if (result.temperatureData[index].date === date) {
          if (
            result.temperatureData[index].min_temp_status === "1" ||
            result.temperatureData[index].max_temp_status === "1"
          ) {
            count = count + 1;
          }
        }
      }
    }
    setTodayTemperatureCount(count);
  };

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Today&apos;s Temp
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {todayTemperatureCount}
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
