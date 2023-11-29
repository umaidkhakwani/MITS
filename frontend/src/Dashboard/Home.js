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

var API_LINK = "http://127.0.0.1:5000/";
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
              <Typography>Sorry, No data to show</Typography>
            </Container>
          </div>
        </div>
      )}
    </div>

  );
}

export default Home;
