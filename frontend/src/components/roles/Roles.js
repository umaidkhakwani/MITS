import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useSelector } from "react-redux";
import AddRoles from "./AddRoles";
import EditRoles from "./EditRoles";
import ViewRoles from "./ViewRoles";

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";

var email_user = "";

function Roles() {
  const [page_options, set_page_options] = useState("add_role");
  const [role_options, set_role_options] = useState("add_role");
  const [warehouse_data, set_warehouse_data] = useState("");

  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in roles", company2);

  const add_role = () => {
    set_role_options("add_role");
    // handle_get_cust_data();
    set_page_options("add_role");
    console.log("iam in add_role");
  };

  const edit_role = () => {
    set_role_options("edit_role");
    // handle_get_cust_data();
    set_page_options("edit_role");
    console.log("iam in edit_role");
  };

  const view_role = () => {
    set_role_options("view_role");
    // handle_get_cust_data();
    set_page_options("view_role");
    console.log("iam in view_role");
  };

  const fetch_data = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email_user = user.email;
        // console.log("Current user's email:", email_user);
        // console.log("Current user's email 2 :", email_user);
        axios
          .post(API_LINK + "get_warehouse", { email: email_user })
          .then((response) => {
            // setProducts(response.data.products);
            console.log("send data to backend :: ", response.data);
            // console.log(typeof response.data);
            if (response.data) {
              set_warehouse_data(response.data);
            }
          })
          .catch((err) => console.error(err));
      } else {
        console.log("No user is currently signed in.");
      }
    });
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div>
      <Container sx={{ height: "88vh" }}>
        <Box margin="10px">
          <Stack spacing={2} direction="row" justifyContent="end">
            <Button
              variant="outlined"
              onClick={add_role}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              Add Role
            </Button>
            <Button
              variant="outlined"
              onClick={edit_role}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              Edit Role
            </Button>
            <Button
              variant="outlined"
              onClick={view_role}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              View Roles
            </Button>
          </Stack>
        </Box>
        {/* <h1>{role_options}</h1> */}
        {role_options == "add_role" ? (
              <AddRoles warehouse_data={warehouse_data} />

          // warehouse_data.length > 0 ? (
          //   // <div>
          //   //   <h1>Add roles</h1>
          //     <AddRoles warehouse_data={warehouse_data} />
              
          //   // </div>
          // ) : (
          //   "No warehouse found"
          // )
        ) : role_options === "edit_role" ? (
          <EditRoles warehouse_data={warehouse_data} />
        ) : (
          <ViewRoles company_name={company2[0].company} />
        )}
      </Container>
    </div>
    // </div>
  );
}

export default Roles;
