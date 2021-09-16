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
  const [machineStatus, setMachineStatus] = React.useState();

  React.useEffect(() => {
    // setInterval(() => {
    getDataFromApi();
    // }, 1000);
  }, []);

  const getDataFromApi = async () => {
    setMaterialType(0);
    const response = await fetch("http://localhost:8000/api/temperature/live");
    const result = await response.json();
    console.log(result.temperatureData[0].machine_status);
    if (result.temperatureData.machine_status === "ON") {
      setMaterialType(result.temperatureData[0].temp2);
      setMinTemp(result.temperatureData[0].min_temp);
      setMaxTemp(result.temperatureData[0].max_temp);
      setMachineStatus(result.temperatureData[0].machine_status);
    }
    if (result.temperatureData[0].machine_status === "OFF") {
      setMachineStatus(result.temperatureData[0].machine_status);
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
