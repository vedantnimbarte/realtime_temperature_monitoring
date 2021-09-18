import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";

export default function Analytics() {
  let tempData = [];
  let tempLabel = [];
  const line = {
    labels: tempLabel,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        data: tempData,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Line data={line} options={options} />
        </CardContent>
      </Card>
    </Box>
  );
}
