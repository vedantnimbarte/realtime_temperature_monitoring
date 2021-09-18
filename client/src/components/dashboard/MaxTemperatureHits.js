import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";

export default function MaxTemperatureHits() {
  const [maxTemperatureCount, setMaxTemperatureCount] = React.useState(0);

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
    if (result.success === "1") {
      for (const index in result.temperatureData) {
        if (result.temperatureData[index].max_temp_status === "1") {
          count = count + 1;
        }
      }
    }
    setMaxTemperatureCount(count);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Max Temp
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {maxTemperatureCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
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
