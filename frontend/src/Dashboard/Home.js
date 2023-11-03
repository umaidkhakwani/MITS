import React, { useEffect, useState } from "react";
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
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { red, green } from "@mui/material/colors";
import Header_ftn from "../containers/Header_ftn";

import logo from "../images/company_logo.png";
import RefreshIcon from "@mui/icons-material/Refresh";
import Dashboard_Cards from "../containers/cards";
import Analytics from "../components/Analytics";
import axios from "axios";

import { useDispatch } from "react-redux";
import { saveCompany } from "../redux2/save_companySlice";

import MITS_gif from "../images/MITS_Logo.gif";

import firebase_app from "../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
var email = "";
var company = "";



function Home() {
  const dispatch = useDispatch();
  const [shopify_warehouse_details, setshopify_warehouse_details] = useState([]);
  const [company_data, set_company_data] = useState();
  const [wait, set_wait] = useState(false);


  const fetchCompanyData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const email = user.email;
        const requestData = {
          email: email,
        };

        const response = await axios.post(API_LINK + "get_user", requestData);
        const userData = {
          company: response.data[0].company,
          id: response.data[0].id,
          email: email,
          password: response.data[0].password,
        };

        if (userData.company) {
          dispatch(saveCompany(userData));
          set_company_data(response.data[0].company);

          const fetch_shopify_warehouse = {
            company: response.data[0].company,
          };

          const response2 = await axios.post(
            API_LINK + "get_shopify_warehouse_By_company",
            fetch_shopify_warehouse
          );

          setshopify_warehouse_details(response2.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []); // This will call fetchCompanyData once when the component mounts

  return (
    <div>
      <Dashboard_Cards />
      {Array.isArray(shopify_warehouse_details) && shopify_warehouse_details.length > 0 ? (
        <div>
          <Analytics
            shopify_data={shopify_warehouse_details}
            user_company={company_data}
          />
          {console.log("1223343")}
        </div>
      ) : (
        <div>
          <Button
            onClick={fetchCompanyData} // Call the same function to refresh data
            style={{
              backgroundColor: "#ce93d8",
              color: "red",
              cursor: "pointer",
              border: "none",
              padding: "2px 8px",
              borderRadius: "10px",
              opacity: 0.9,
            }}
          >
            <RefreshIcon style={{ color: "black" }} />
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <img
                src={MITS_gif}
                alt="Loading..."
                style={{ width: "100px", height: "100px" }}
              />
              <Typography>Sorr, No data to show</Typography>
            </Container>
          </div>
        </div>
      )}
    </div>

    //<Header_ftn heading="Overview" />

    // </Box>

    // <div>
    // <Box
    //   component="main"
    //   sx={{
    //     flexGrow: 1,
    //     p: 3,
    //     backgroundColor: "#f2f2f2", // Set the background color
    //   }}
    // >
    // Notification Badge
    // <IconButton
    //     color="inherit"
    //     aria-label="Notifications"
    //     onClick={handleNotificationClick}
    //   >
    //     <Badge badgeContent={3} color="error">
    //       <NotificationsIcon />
    //     </Badge>
    //   </IconButton>
    //   <Menu
    //     anchorEl={notificationAnchorEl}
    //     open={Boolean(notificationAnchorEl)}
    //     onClose={handleNotificationClose}
    //   >
    //     <MenuItem>Notification 1</MenuItem>
    //     <MenuItem>Notification 2</MenuItem>
    //     <MenuItem>Notification 3</MenuItem>
    //   </Menu>

    //   Profile Badge
    //   <IconButton
    //     color="inherit"
    //     aria-label="Profile"
    //     onClick={handleProfileClick}
    //   >
    //     <AccountCircleIcon />
    //   </IconButton>
    //   <Menu
    //     anchorEl={profileAnchorEl}
    //     open={Boolean(profileAnchorEl)}
    //     onClose={handleProfileClose}
    //   >
    //     <MenuItem>My Profile</MenuItem>
    //     <MenuItem>Logout</MenuItem>
    //   </Menu>

    //   <Typography paragraph>
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    //     tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
    //     non enim praesent elementum facilisis leo vel. Risus at ultrices mi
    //     tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
    //     tellus. Convallis convallis tellus id interdum velit laoreet id donec
    //     ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
    //     suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
    //     quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
    //     proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
    //     tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
    //     varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
    //     Lorem donec massa sapien faucibus et molestie ac.
    //   </Typography>
    //   <Typography paragraph>
    //     Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
    //     ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
    //     integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
    //     lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
    //     Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
    //     vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
    //     accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
    //     Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
    //     senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
    //     Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
    //     maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
    //     aliquam ultrices sagittis orci a.
    //   </Typography>
    // </Box>
    // </div>
  );
}

export default Home;
