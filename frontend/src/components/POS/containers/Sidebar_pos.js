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
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Inbox as InboxIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationsNone as NotificationsNoneIcon } from "@mui/icons-material";

import MITS_logo from "../../../images/dashboard_Logo_MITS.png";
import bg1 from "../../../images/sidebar3.png";
import dashboard_icon from "../../../images/dashboard_icon.png";
import inventory_icon from "../../../images/inventory_icon.png";
import warehouse_icon from "../../../images/warehouse_icon.png";
import tools_icon from "../../../images/tools_icon.png";
import customers_icon from "../../../images/customers_icon.png";
import supplier_icon from "../../../images/supplier_icon.png";
import pos_icon from "../../../images/pos_icon.png";
import analytics_icon from "../../../images/analytics_icon.png";
import assign_icon from "../../../images/assign_icon.png";
import company_logo from "../../../images/company_logo.png";
import setting from "../../../images/setting.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../css/styles.css";
import { Badge, Grid } from "@mui/material";
import Header_ftn from "../../../containers/Header_ftn";
import Home from "../../../Dashboard/Home";
import Warehouse_create from "../../warehouse/Warehouse_create";
import Inventory_products from "../../inventory/Inventory_products";
import Choose_warehouse from "../../inventory/Choose_warehouse";
import Customers from "../../customers/Customers";
import Suppliers from "../../suppliers/Suppliers";
import Suppliers_create from "../../suppliers/Suppliers_create";
import POS1 from "../POS1";
import Analytics from "../../Analytics";
import Roles from "../../roles/Roles";
import User_update from "../../setting/User_update";
import { Link, useNavigate } from "react-router-dom";
import Return_POS from "../Return_POS";
import Hold_Sales from "../Hold_Sales";
import POS_Closing from "../POS_Closing";
import Expenses from "../Expenses";
import POS_inventory from "../POS_inventory";
import POS_Customers from "../POS_Customer";
import Choose_POS from "./Choose_POS";

import firebase_app from "../../../Firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

const auth = getAuth(firebase_app);


// import Home from "./Home";
// import Warehouse_ftn from "../components/warehouse/Warehouse_component";
// import Warehouse_create from "../components/warehouse/Warehouse_create";
// import Header_ftn from "../containers/Header_ftn";
// import Customers_final from "../components/customers/Customers";
// import Customers from "../components/customers/Customers";
// import Suppliers from "../components/suppliers/Suppliers";
// import Suppliers_create from "../components/suppliers/Suppliers_create";
// import PosSale1 from "../components/POS/hamza/PosSale1";
// import POS1 from "../components/POS/POS1";
// import Transfer_Stock from "../components/warehouse/Transfer_Stock";
// import Inventory_products from "../components/inventory/Inventory_products";
// import Transfer_products from "../components/inventory/Transfer_products";
// import Inventory_ftn from "../components/warehouse/Inventory";
// import Choose_warehouse from "../components/inventory/Choose_warehouse";
// import Roles from "../components/roles/Roles";
// import User_update from "../components/setting/User_update";
// import Analytics from "../components/Analytics";
// import Inventory_transfer from "../components/inventory/Transfer";


const drawerWidth = 240;

// const dashboard_icon = '"<FontAwesomeIcon icon="fal fa-th-large" style={{color: "#c2d0e5",}} />"';

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


const Logo = styled("img")({
  position: "absolute",
  top: "16px", // Adjust the top position as needed
  left: "16px", // Adjust the left position as needed
  width: "auto", // Adjust the width as needed
  height: "40px", // Adjust the height as needed
  zIndex: 1001, // Ensure the logo is above other content
  cursor: "pointer",
});

export default function Sidebar_pos() {

  const navigate = useNavigate();


  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("POS");
  const [openSublist, setOpenSublist] = useState(null);  
  const [user_title, setuser_title] = useState("");

  const user = auth.currentUser;
  var API_LINK = "http://localhost:5000/";
  var title2 = "";


  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handlelogoClick = async() => {
    await navigate("/dashboard");
    console.log("showing handlelogoClick")
    setSelectedItem("Dashboard");
    setOpenSublist(null);
  };

  const handleItemClick = (item) => {
    if (item.sublist) {
      setSelectedItem(item.sublist[0].text); // Select the first subitem
    } else {
      setSelectedItem(item.text); // Select the parent if it has no subitems
    }
    if (openSublist === item.text) {
      setOpenSublist(null);
    } else {
      setOpenSublist(item.text);
    }
  };

  const handleSubItemClick = (subItemText) => {
    setSelectedItem(subItemText);
  };


  useEffect(() => {
    let email = "";
    if (user) {
      email = user.email;
      axios
        .post(API_LINK + "get_user", { email: email })
        .then((response) => {
          // setProducts(response.data.products);
          console.log("Showing user data in sidebar :: ", response.data);
          // console.log(typeof response.data);
          if (response.data) {
            // set_warehouse_data(response.data);
            setuser_title(response.data[0].fname + " " + response.data[0].lname);
            // title2 = response.data[0].fname + " " + response.data[0].lname;
            // console.log(title2);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [selectedItem]);


  const menuItems = [
    // { text: "Dashboard", icon: dashboard_icon },
    // { text: "Warehouse", icon: warehouse_icon },
    // {
    //   text: "Inventory",
    //   icon: inventory_icon,
    //   sublist: [
    //     { text: "Products", icon: dashboard_icon },
    //     { text: "Transfers", icon: dashboard_icon },
    //   ],
    // },
    // { text: "Customers", icon: customers_icon },
    // {
    //   text: "Suppliers",
    //   icon: supplier_icon,
    //   sublist: [
    //     { text: "View", icon: dashboard_icon },
    //     { text: "Add", icon: dashboard_icon },
    //   ],
    // },
    { text: "POS", icon: dashboard_icon },
    { text: "Return", icon: warehouse_icon },
    { text: "Hold Sales", icon: supplier_icon },
    { text: "POS Closing", icon: pos_icon },
    { text: "Expenses", icon: analytics_icon },
    { text: "Inventory", icon: inventory_icon },
    { text: "Customers", icon: customers_icon },
    // { text: "Analytics", icon: analytics_icon },
    // { text: "Assign", icon: assign_icon },
    // { text: "Smart Tools", icon: setting },
    // { text: "Setting", icon: setting },
  ];

  return (
    <div>
      <Box sx={{ display: "flex", backgroundColor: "#f2f2f2", height: "100%" }}>
        <div>

          {/* ---------------------------------------------------------------------------------------------------------       */}

          <Drawer
            variant="permanent"
            open={open}
            className="drawer-container"
            height="100vh"
          >
            <Grid
              container
              direction={open ? "column" : "row"}
              sx={{
                height: "100%",
                backgroundImage: `url(${bg1})`, // Set your background image URL here
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <Grid item>
                {/* Logo */}
                {open && (
                  <Logo src={MITS_logo} alt="Logo" onClick={handlelogoClick} />
                )}

                {/* Opening Arrow */}
                <DrawerHeader>
                  <IconButton onClick={handleDrawerToggle}>
                    {open ? (
                      theme.direction === "rtl" ? (
                        <ChevronRightIcon style={{ color: "#cec7c7" }} />
                      ) : (
                        <ChevronLeftIcon style={{ color: "#cec7c7" }} />
                      )
                    ) : (
                      <ChevronRightIcon style={{ color: "#cec7c7" }} />
                    )}
                  </IconButton>
                </DrawerHeader>
              </Grid>
              {open ? (
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "16px",
                    background: "rgba(89, 57, 147, 0.50)",
                    // padding: "16px",
                    // margin: "20px 0",
                  }}
                >
                  {/* Round Logo */}
                  <img
                    src={company_logo} // Replace with the source of your round logo
                    alt="Round Logo"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      margin: "10px",
                    }}
                  />

                  <div>
                    {/* Company Name */}
                    <Typography
                      variant="h7"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      MEPTICS
                    </Typography>

                    {/* Total Members */}
                    <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
                      12 Members
                    </Typography>
                  </div>
                </Box>
              ) : (
                ""
              )}

              <Grid item sx={{ overflowY: "auto", maxHeight: "550px" }}>
                <Divider />

                {/* Lists */}
                <div>
                  {/* Your logo or header here */}
                  <List>
                    {menuItems.map((item, index) => (
                      <div key={item.text}>
                        <ListItem
                          disablePadding
                          sx={{
                            display: "block",
                            backgroundColor:
                              selectedItem === item.text
                                ? "rgba(225, 246, 246, 0.10)"
                                : "transparent",
                            borderLeft:
                              selectedItem === item.text
                                ? "5px solid #593993"
                                : "none",
                          }}
                        >
                          <ListItemButton
                            sx={{
                              height: "30px",
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                              color:
                                selectedItem === item.text
                                  ? "#593993"
                                  : "#cec7c7",
                              fontFamily: "Khula",
                              fontSize: "28px",
                              fontStyle: "normal",
                              fontWeight:
                                selectedItem === item.text ? "bold" : 400,
                              lineHeight: "normal",
                              margin: "10px 0",
                            }}
                            onClick={() => handleItemClick(item)}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={item.icon}
                                alt={item.text}
                                style={{
                                  filter:
                                    selectedItem === item.text
                                      ? "brightness(0) invert(1) sepia(100%) saturate(10000%) hue-rotate(234deg) brightness(1.3)"
                                      : "none",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.text}
                              sx={{
                                opacity: open ? 1 : 0,
                                fontWeight:
                                  selectedItem === item.text
                                    ? "bold"
                                    : "normal",
                              }}
                            />
                            {item.sublist && (
                              <IconButton
                                sx={{ color: "#cec7c7", marginLeft: "auto" }}
                              >
                                {openSublist === item.text ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </IconButton>
                            )}
                          </ListItemButton>
                        </ListItem>
                        {item.sublist && openSublist === item.text && (
                          <List sx={{ paddingLeft: "25px" }}>
                            {item.sublist.map((subItem, subIndex) => (
                              <ListItem
                                key={subItem.text}
                                disablePadding
                                sx={{
                                  display: "block",
                                  backgroundColor:
                                    selectedItem === subItem.text
                                      ? "rgba(225, 246, 246, 0.10)"
                                      : "transparent",
                                  borderLeft:
                                    selectedItem === subItem.text
                                      ? "5px solid #593993"
                                      : "none",
                                }}
                              >
                                <ListItemButton
                                  sx={{
                                    height: "20px",
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                    color:
                                      selectedItem === subItem.text
                                        ? "#593993"
                                        : "#cec7c7",
                                    fontFamily: "Khula",
                                    fontSize: "28px",
                                    fontStyle: "normal",
                                    fontWeight:
                                      selectedItem === subItem.text
                                        ? "bold"
                                        : 400,
                                    lineHeight: "normal",
                                    margin: "8px 0",
                                  }}
                                  onClick={() =>
                                    handleSubItemClick(subItem.text)
                                  }
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 0,
                                      mr: open ? 3 : "auto",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* Your sub-item icon here */}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={subItem.text}
                                    sx={{
                                      opacity: open ? 1 : 0,
                                      fontWeight:
                                        selectedItem === subItem.text
                                          ? "bold"
                                          : "normal",
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </div>
                    ))}
                  </List>
                  <Divider />
                </div>

              </Grid>
            </Grid>
          </Drawer>
        </div>

        <Box
          component="main"
          sx={{ width: "90%", height: "100%", backgroundColor: "#f2f2f2" }}
        >
          {user_title ? (
            <Header_ftn heading={selectedItem} title={user_title} />
          ) : (
            ""
          )}
          {selectedItem === "POS" ? (
            // <POS1 />
            <Choose_POS />
          ) : selectedItem === "Return" ? (
            // <Return_POS />
            <Choose_POS />
          ) :  selectedItem === "Hold Sales" ? (
            <Hold_Sales />
          ) : selectedItem === "POS Closing" ? (
            // <Inventory_transfer />
            // <Transfer_products />
            <POS_Closing />
          ) :selectedItem === "Expenses" ? (
            <Expenses />
          ) : selectedItem === "Inventory" ? (
            <POS_inventory />
          ) : selectedItem === "Customers" ? (
            <POS_Customers />
        //   ) : selectedItem === "POS" ? (
        //     <Home />
        //   ) : selectedItem === "Analytics" ? (
        //     <Analytics />
        //   ) : selectedItem === "Assign" ? (
        //     <Roles />
        //   ) : selectedItem === "Smart Tools" ? (
        //     ""
        //   ) : selectedItem === "Setting" ? (
        //     <User_update />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </div>
  );
}

