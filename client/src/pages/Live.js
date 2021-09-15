import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import MaxTemperatureHits from "../components/live/MaxTemperatureHits";
import MinTemperatureHits from "../components/live/MinTemperatureHits.js";

const Live = () => (
  <>
    <Helmet>
      <title>Temperature Monitoring Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <MinTemperatureHits />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <MaxTemperatureHits />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Live;
