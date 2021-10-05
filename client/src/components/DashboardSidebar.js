import { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Activity as LiveActivityIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { useCookies } from "react-cookie";

const user = {};

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/live",
    icon: LiveActivityIcon,
    title: "Live Data",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Users",
  },
  {
    href: "/app/reports",
    icon: ShoppingBagIcon,
    title: "Reports",
  },

  {
    href: "/app/account",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/logout",
    icon: LockIcon,
    title: "Logout",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["temp_monitoring_auth"]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {cookies.user && cookies.user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {cookies.user && cookies.user.job_title}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1 }} />
      <Typography
        sx={{
          color: "gray",
          alignSelf: "center",
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Version 1.0
      </Typography>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 66,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
