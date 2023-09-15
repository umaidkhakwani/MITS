import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { red, green } from "@mui/material/colors";

import logo from "../images/company_logo.png";
import Dashboard_Cards from "./cards";
import Analytics from "../components/Analytics";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  height: "30px",
  width:"97%",
};

const badgesContainerStyle = {
  display: "flex",
  gap: "16px",
};

const logoStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
};

function Header_ftn(props) {
  // const theme = useTheme();
  // const [open, setOpen] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    // For example, redirect to the logout page
  };

  return( 
  <div>
<Box sx={containerStyle}>
        <Typography
          variant="h6"
          sx={{
            color: "#593993",
            // fontFamily: "Inter",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            marginLeft: "30px",
          }}
        >
          {props.heading}
        </Typography>

        <Box sx={badgesContainerStyle}>
          <IconButton
            color="inherit"
            aria-label="Notifications"
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Profile"
            onClick={handleProfileClick}
          >
            <img src={logo} alt="Company Logo" style={logoStyle} />
          </IconButton>
        </Box>
      </Box>
      <hr
        style={{
          border: "none",
          borderBottom: "2px solid #593993",
          margin: " 0 60px",
        }}
      />
            {/* Notification Badge */}
            <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(89, 57, 147, 0.85)", // Background color with opacity
            width: "300px", // Adjust the width as needed
          },
        }}
      >
        <List>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              margin: "5px",
              width: "96%",
              backgroundColor: "#f2f2f2", // Background color of the notification box
            }}
          >
            {/* Company Logo */}
            <Avatar
              src={logo}
              sx={{ width: "40px", height: "40px", margin: "10px" }}
            />

            {/* Notification Texts */}
            <div>
              <Typography
                variant="body2"
                sx={{
                  color: "#593993",
                  marginLeft: "5px",
                }}
              >
                Notification 1
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#593993",
                  marginLeft: "5px",
                }}
              >
                Text 1
              </Typography>
            </div>
          </ListItem>

          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              margin: "5px",
              width: "96%",
              backgroundColor: "#f2f2f2", // Background color of the notification box
            }}
          >
            {/* Company Logo */}
            <Avatar
              src={logo}
              sx={{ width: "40px", height: "40px", margin: "10px" }}
            />

            {/* Notification Texts */}
            <div>
              <Typography
                variant="body2"
                sx={{
                  color: "#593993",

                  margin: "5px",
                }}
              >
                Notification 2
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#593993",
                  marginLeft: "5px",
                }}
              >
                Text 2
              </Typography>
            </div>
          </ListItem>

          {/* Add more notifications here */}
        </List>
      </Menu>

      {/* Profile Badge */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(89, 57, 147, 0.8)", // Background color with opacity
            borderRadius: "10px",
            padding: "16px",
            minWidth: "200px", // Adjust the width as needed
          },
        }}
      >
        {/* Round Company Logo */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src={logo} // Replace with the source of your round company logo
            alt="Company Logo"
            style={{
              width: "60px", // Adjust the size as needed
              height: "60px", // Adjust the size as needed
              borderRadius: "50%",
              marginBottom: "8px",
            }}
          />
          <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
            Company Name
          </Typography>
        </div>

        {/* Logout Button */}
        <MenuItem
          onClick={handleLogout}
          sx={{ color: "#FFFFFF", justifyContent: "center" }}
        >
          Logout
        </MenuItem>
      </Menu>
      
  </div>
  );
}

export default Header_ftn;