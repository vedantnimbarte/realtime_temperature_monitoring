import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  // Box
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const TotalTempHits = (props) => {
  const [totalTemperatureCount, setTotalTemperatureCount] = React.useState();

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
        if (
          result.temperatureData[index].min_temp_status === "1" ||
          result.temperatureData[index].max_temp_status === "1"
        ) {
          count = count + 1;
        }
      }
    }
    setTotalTemperatureCount(count);
  };
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Temp
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalTemperatureCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalTempHits;
