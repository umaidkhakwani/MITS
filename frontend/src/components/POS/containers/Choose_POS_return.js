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
  import firebase_app from "../../../Firebase/firebase";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import POS1 from "../POS1";
  
  import { useSelector } from "react-redux";
import Return_POS from "../Return_POS";
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  
  var API_LINK = "127.0.0.1:5000/";
  var sortedCustomers = "";
  var email_user = "";
  
  function Choose_POS_return() {
    const [warehouse_index, set_warehouse_index] = useState("");
    const [warehouse_data, set_warehouse_data] = useState("");
    const [user_data, set_user_data] = useState("");
  
  //-----------------------------------------------------------------------------------------------
  
  const [pos1Component, setPos1Component] = useState(null);
  
  //-----------------------------------------------------------------------------------------------
  
  
    //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
    const company2 = useSelector((state) => state.users);
    console.log("showing company2 in choose POS", company2);
  
    var warehouse_list = "";
    //   console.log("showing obj1 ", props.obj1);
  
    const handleMenuItemClick = (index) => () => {
      handle_check(index); // Call handle_check only when the MenuItem is clicked
    };
  
    const handle_check = (index) => {
      set_warehouse_index(index);
      console.log("showing index", index);
      console.log("showing warehouse_list", warehouse_list);
    };
  
    const displayObjects = (designation) => {
      if (designation) {
        if (designation !== "786") {
          const selectedObjects = [];
          if (warehouse_data) {
            for (let i = 0; i < designation.length; i++) {
              if (designation[i] === "1") {
                selectedObjects.push(warehouse_data[i]);
              }
            }
            console.log("showing selectedObjects", selectedObjects);
          }
  
          return selectedObjects;
        }
      }
    };
  
    const fetch_user_data = async () => {
      if (user) {
        email_user = user.email;
  
        const requestData = {
          email: email_user,
        };
        await axios
          .post(API_LINK + "get_user", { email: email_user })
          .then((response) => {
            // setProducts(response.data.products);
            console.log("send data to backend :: ", response.data[0].userToken);
            set_user_data(response.data[0].userToken);
            displayObjects(response.data[0].userToken);
            // console.log(typeof response.data);
            if (response.data) {
              // set_warehouse_data(response.data);
            }
          })
          .catch((err) => console.error(err));
      }
    };
  
    const fetch_data = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          email_user = user.email;
  
          const filteredCompanies = company2.filter(
            (company) => company.email === email_user
          );
          console.log("filtered companies", filteredCompanies[0]);
  
          // console.log("Current user's email:", email_user);
          // console.log("Current user's email 2 :", email_user);
          axios
            .post(API_LINK + "get_warehouse_By_company", { company: filteredCompanies[0].company })
            .then((response) => {
              // setProducts(response.data.products);
              // console.log("send data to backend :: ", response.data);
              // console.log(typeof response.data);
              if (response.data) {
                set_warehouse_data(response.data);
                fetch_user_data();
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
      fetch_user_data();
    }, []);
  
  
    const handleChange = (event) => {
      set_warehouse_index(event.target.value); // Update selected inventory
      if (event.target.value)
        console.log(
          "showing value of menuitem ",
          warehouse_data[event.target.value]
        );
    };
  
  
  //   useEffect(() => {
  //     // Define a variable to store the selected warehouse title.
  //     let selectedWarehouseTitle = '';
  
  //     if (warehouse_index !== '' && warehouse_data[warehouse_index]) {
  //       selectedWarehouseTitle = warehouse_data[warehouse_index].title;
  //     }
  
  //     // Render the POS1 component with the selected warehouse title.
  //     const pos1Component = selectedWarehouseTitle ? <POS1 warehouse_name={selectedWarehouseTitle} /> : null;
  
  //     // Set state to trigger re-render.
  //     setPos1Component(pos1Component);
  //   }, [warehouse_index, warehouse_data]);
  
  
    return (
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
        {/* {pos1Component} */}
        {warehouse_index ? (
          <Return_POS warehouse_name={warehouse_data[warehouse_index].title} />
        ) : warehouse_index === 0 ? (
          <Return_POS warehouse_name={warehouse_data[0].title} />
        ) : (
          ""
        )}
      </div>
    );
  }
  
  export default Choose_POS_return;
  