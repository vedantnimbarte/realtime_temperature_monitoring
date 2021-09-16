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

export default function MinTemperatureHits(props) {
  const [minTemperatureCount, setMinTemperatureCount] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      getDataFromApi();
    }, 1000);
  }, []);

  const getDataFromApi = async () => {
    const response = await fetch("http://localhost:8000/api/temperature/live");
    const result = await response.json();
    if (result.temperatureData[0].machine_status === "ON") {
      setMinTemperatureCount(result.temperatureData[0].temp1);
    }
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Temperature 1
            </Typography>
            <Typography color="textPrimary" variant="h1" sx={{ fontSize: 70 }}>
              {minTemperatureCount}
              <sup>&#176;</sup>C
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 70,
                width: 70,
              }}
            >
              <i className="fas fa-temperature-low fa-2x"></i>
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 3,
          }}
        ></Box>
      </CardContent>
    </Card>
  );
}
