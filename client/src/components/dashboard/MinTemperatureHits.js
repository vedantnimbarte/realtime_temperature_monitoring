import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

export default function MinTemperatureHits(props) {
  const [minTemperatureCount, setMinTemperatureCount] = React.useState(0);

  React.useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    const response = await fetch("http://localhost:8000/api/getTemp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ device_id: "TMS_101" }),
    });
    const result = await response.json();
    let count = 0;
    for (const index in result.temperatureData) {
      if (result.temperatureData[index].min_temp_status === "1") {
        count = count + 1;
      }
    }
    setMinTemperatureCount(count);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Min Temp
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {minTemperatureCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 3,
          }}
        >
          {/* <ArrowUpwardIcon sx={{ color: green[900] }} />
        <Typography
          variant="body2"
          sx={{
            color: green[900],
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
}
