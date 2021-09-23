import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import Budget from "../components/dashboard/Budget";
import MaxTemperatureHits from "../components/dashboard/MaxTemperatureHits";
import MinTemperatureHits from "../components/dashboard/MinTemperatureHits.js";
import TotalTempHits from "../components/dashboard/TotalTempHits";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [cookies, setCookies] = useCookies(["temp_monitoring_auth"]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cookies.user === undefined) {
      navigate("/", { replace: true });
    }
  });

  return (
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
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <MinTemperatureHits />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <MaxTemperatureHits />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalTempHits sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
