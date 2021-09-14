import PropTypes from "prop-types";
import { Box, Grid, Container, Divider, Typography } from "@material-ui/core";
import Budget from "../dashboard/Budget";
import MaxTemperatureHits from "../dashboard/MaxTemperatureHits";
import MinTemperatureHits from "../dashboard/MinTemperatureHits";
import TotalTempHits from "../dashboard/TotalTempHits";
import { Helmet } from "react-helmet";

const ReportCard = ({ product, ...rest }) => (
  <>
    <Helmet>
      <title>Reports | Temperature Monitoring Portal</title>
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

ReportCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ReportCard;
