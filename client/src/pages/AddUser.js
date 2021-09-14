import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AddUserForm from "../components/user/AddUserForm";

const Account = () => (
  <>
    <Helmet>
      <title>Add User | Temperature Monitoring Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={6} xs={12}>
            <AddUserForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
