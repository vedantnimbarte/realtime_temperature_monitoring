import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const UserListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <RouterLink to="/app/adduser">
        <Button color="primary" variant="contained">
          Add User
        </Button>
      </RouterLink>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default UserListToolbar;
