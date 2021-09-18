import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default function MaxTemperatureHits() {
  const [maxTemperatureCount, setMaxTemperatureCount] = React.useState(0);
  const [maxTemp, setMaxTemp] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      getDataFromApi();
    }, 1000);
  }, []);

  const getDataFromApi = async () => {
    // setMaxTemperatureCount(0);
    setMaxTemp(0);
    const response = await fetch("http://localhost:8000/api/temperature/live");
    const result = await response.json();
    if (result.success === "1") {
      if (result.temperatureData[0].machine_status === "ON") {
        setMaxTemperatureCount(result.temperatureData[0].temp2);
        if (result.temperatureData[0].max_temp_status === "1") {
          setMaxTemp(1);
        }
      }
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Termperature 2
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: 70, color: `${maxTemp ? "red" : null}` }}
            >
              {maxTemperatureCount}
              <sup>&#176;</sup>C
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 70,
                width: 70,
              }}
            >
              <i className="fas fa-temperature-high fa-2x"></i>
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          {/* <LinearProgress value={75.5} variant="determinate" /> */}
        </Box>
      </CardContent>
    </Card>
  );
}
