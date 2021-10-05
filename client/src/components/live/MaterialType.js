import React from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default function MaterialType() {
  const [materialType, setMaterialType] = React.useState();
  const [minTemp, setMinTemp] = React.useState(0);
  const [maxTemp, setMaxTemp] = React.useState(0);
  const [machineStatus, setMachineStatus] = React.useState("OFF");

  React.useEffect(() => {
    setInterval(() => {
      getDataFromApi();
    }, 1000);
  }, []);

  function getTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

  const getDataFromApi = async () => {
    const response = await fetch("http://localhost:8000/api/temperature/live");
    const result = await response.json();
    if (result.success === "1") {
      if (result.temperatureData[0].machine_status === "ON" && result.temperatureData[0].time === getTime(new Date())) {
        setMaterialType(result.temperatureData[0].material_type);
        setMinTemp(result.temperatureData[0].min_temp);
        setMaxTemp(result.temperatureData[0].max_temp);
        setMachineStatus(result.temperatureData[0].machine_status);
      }
      if (result.temperatureData[0].machine_status === "OFF") {
        setMachineStatus(result.temperatureData[0].machine_status);
        setMaterialType(0);
        setMinTemp(0);
        setMaxTemp(0);
      }
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            sx={{ color: `${machineStatus === "ON" ? "green" : "red"}` }}
          >
            Machine Status: {machineStatus}LINE
          </Typography>
          <ButtonGroup sx={{ marginTop: "5%", marginLeft: "10%" }}>
            <Button
              style={{
                backgroundColor: `${
                  materialType === "Steel Chips" ? green[600] : null
                }`,
                color: `${materialType === "Steel Chips" && "white"}`,
                fontSize: 20,
              }}
            >
              Steel Chips
            </Button>
            <Button
              style={{
                backgroundColor: `${
                  materialType === "Mill Scale" ? green[600] : null
                }`,
                color: `${materialType === "Mill Scale" && "white"}`,
                fontSize: 20,
              }}
            >
              Mill Scale
            </Button>
          </ButtonGroup>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">
              Min Temp: {minTemp}
              <sup>&#176;</sup>C
            </Typography>
            <Typography variant="h4">
              Max Temp: {maxTemp}
              <sup>&#176;</sup>C
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
