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

const auth = getAuth(firebase_app);

var API_LINK = "127.0.0.1:5000/";
var sortedCustomers = "";
var email_user = "";

function Inventory_ftn() {
  const [warehouse_index, set_warehouse_index] = React.useState("");
  const [warehouse_data, set_warehouse_data] = React.useState("");
  //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index

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
    // if (selectedItemIndex !== null) {
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       email_user = user.email;
    //       console.log("Current user's email:", email_user);
    //     } else {
    //       console.log("No user is currently signed in.");
    //     }
    //   });
    //   axios
    //     .post(API_LINK + "get_warehouse", email_user)
    //     .then((response) => {
    //       // setProducts(response.data.products);
    //       console.log("send data to backend :: ", response.data);
    //       console.log(typeof response.data);
    //     })
    //     .catch((err) => console.error(err));
    // }
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

  //   const handle_create_warehouse = (field, value) => {
  //     // setInventory(event.target.value);
  //     // console.log("showing", event.target.value);
  //     setwarehouse_create((prevItem) => ({
  //       ...prevItem,
  //       [field]: value,
  //     }));
  //     console.log("showing created products", warehouse_create);
  //   };

  //   const sorting_function = () => {
  //     if (responseData_customers) {
  //       sortedCustomers = responseData_customers
  //         .slice()
  //         .sort((a, b) => b.orders_count - a.orders_count);
  //     }
  //   };

  //   async function handle_get_cust_data() {
  //     try {
  //       const response = await axios.get(API_LINK + "create_warehouse");
  //       console.log("data sent from backend :: ", response.data.customers);
  //       console.log(typeof response.data);
  //       setresponseData_customers(response.data.customers);
  //       sorting_function(); // Move this line to after setting the state
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle the error
  //     }
  //   }
  //   const isFormValid = () => {
  //     if (
  //       warehouse_create.title !== "" &&
  //       warehouse_create.address !== "" &&
  //       warehouse_create.city !== "" &&
  //       warehouse_create.country !== ""
  //     ) {
  //       set_form_validity(true);
  //       console.log("showing form validity", form_validity);
  //       console.log(warehouse_create);
  //     } else {
  //       set_form_validity(false);
  //       console.log("showing form validity", form_validity);
  //     }
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     if (form_validity) {
  //       console.log(isFormValid());
  //       const requestData = {
  //         product: warehouse_create,
  //       };
  //       console.log("into handle submit", requestData);
  //       onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           const email = user.email;
  //           handle_create_warehouse("email", email);
  //           console.log("Current user's email:", email);
  //         } else {
  //           console.log("No user is currently signed in.");
  //         }
  //       });

  //       console.log("showing valuess: ", warehouse_create.email);
  //       axios
  //         .post(API_LINK + "create_warehouse", requestData)
  //         .then((response) => {
  //           // setProducts(response.data.products);
  //           console.log("send data to backend :: ", response.data);
  //           console.log(typeof response.data);
  //         })
  //         .catch((err) => console.error(err));
  //       setwarehouse_create({
  //         title: "",
  //         address: "",
  //         city: "",
  //         country: "",
  //       });
  //       set_form_validity(false);
  //     }
  //   };

  //   useEffect(() => {
  //     handle_get_cust_data();
  //     const interval = setInterval(() => {
  //       const now = new Date();
  //       const date_seconds = now.getSeconds();
  //       console.log(date_seconds);

  //       console.log("showing page options", page_options);
  //     }, 10000); // Call the function every 10 second (1000 milliseconds)

  //     return () => {
  //       clearInterval(interval); // Clean up the interval when the component unmounts
  //     };
  //   }, []);

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
        <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Warehouse List
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
          <Inventory_products
            warehouse_name={warehouse_data[warehouse_index].title}
          />
        ) : warehouse_index === 0 ? (
          <Inventory_products
            warehouse_name={warehouse_data[0].title}
          />
        ) : (
          ""
        )}
    </div>
  );
}

export default Inventory_ftn;
