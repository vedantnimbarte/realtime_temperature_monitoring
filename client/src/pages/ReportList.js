import { Helmet } from "react-helmet";
import { Box, Container, Grid, Divider } from "@material-ui/core";
import ProductCard from "../components/report/ReportCard";
import ReportListResults from "../components/report/ReportListResults";

const ReportList = () => (
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
        {/* <Box sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            {products.map((product) => ( */}
        <Grid lg={12} md={12} xs={12}>
          <ProductCard />
        </Grid>
        {/* ))}
          </Grid> */}
        {/* </Box> */}
        <Box sx={{ pt: 3 }}>
          <ReportListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default ReportList;
