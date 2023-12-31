import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Inventory_products from "./Inventory_products";
import Transfer_Stock from "../warehouse/Transfer_Stock";
import Transfer_products from "./Transfer_products";
import Transfer_status from "./Transfer_status";

const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";
var email_user = "";

function Choose_warehouse() {
  const [warehouse_index, set_warehouse_index] = React.useState("");
  const [warehouse_data, set_warehouse_data] = React.useState("");
  const [transfer, set_transfer] = useState("transfer_status");

  //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index

  var warehouse_list = "";
  //   console.log("showing obj1 ", props.obj1);

  const handleMenuItemClick = (index) => () => {
    handle_check(index); // Call handle_check only when the MenuItem is clicked
  };

  const handle_transfer_stock = () => {
    set_transfer("transfer_stock");
  };

  const handle_transfer_status = () => {
    set_transfer("transfer_status");
  };

  const handle_check = (index) => {
    set_warehouse_index(index);
    console.log("showing index", index);
    console.log("showing warehouse_list", warehouse_list);
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
            // console.log("send data to backend :: ", response.data);
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

  const handleChange = (event) => {
    set_warehouse_index(event.target.value); // Update selected inventory
    if (event.target.value)
      console.log(
        "showing value of menuitem ",
        warehouse_data[event.target.value]
      );
  };

  return (
    <div>
      <Box margin="10px">
        <Stack spacing={2} direction="row" justifyContent="end">
          <Button
            variant="outlined"
            onClick={handle_transfer_stock}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Transfer Stock
          </Button>
          <Button
            variant="outlined"
            onClick={handle_transfer_status}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Transfer Status
          </Button>
        </Stack>
      </Box>
      {transfer === "transfer_stock" ? (
        <div>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 150, marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Choose Warehouse
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={warehouse_index}
              onChange={handleChange}
              autoWidth
              label="Inventory"
              onClick={fetch_data}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {warehouse_data.length > 0
                ? warehouse_data.map((warehouse, index) => (
                    <MenuItem
                      key={index}
                      value={index}
                      onClick={handleMenuItemClick(index)}
                    >
                      {warehouse.title}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
        </Container>
        {warehouse_index ? (
          <Transfer_products
            warehouse_name={warehouse_data[warehouse_index].title}
          />
        ) : warehouse_index === 0 ? (
          <Transfer_products warehouse_name={warehouse_data[0].title} />
        ) : (
          ""
        )}
      </div>
      ):(<Transfer_status />)}
      
    </div>
  );
}

export default Choose_warehouse;
