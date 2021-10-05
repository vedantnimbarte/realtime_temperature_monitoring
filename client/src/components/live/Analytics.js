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
  const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Min Temp',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'green',
      borderColor: 'green',
    },
    {
      label: 'Max Temp',
      data: [20, 29, 23, 35, 32, 30],
      fill: false,
      backgroundColor: 'red',
      borderColor: 'red',
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
          <Line data={data} options={options} />
        </CardContent>
      </Card>
    </Box>
  );
}
