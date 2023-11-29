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
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import convertToUTC from "../UTC_converter";
import Inventory_warehouse from "../warehouse/Inventory_warehouse";
import Purchase_Order from "./Purchase_Order";

const auth = getAuth(firebase_app);

var API_LINK = "127.0.0.1:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function Suppliers_create() {
  const [form_validity, set_form_validity] = useState(false);
  const [selectedStores, setSelectedStores] = useState(["other"]);
  const [supplier_options, set_supplier_options] = useState("purchase_order");

  const [suppliers_create, setsuppliers_create] = useState([
    {
      name: "",
      email: "",
      phone_number: "",
    //   company: "",
      category: "",
      city: "",
      address: "",
      country: "",
    },
  ]);

  var email = "";

  const handleStoreChange = (store) => {
    setSelectedStores(store);
  };

  const shopify_store_addProduct = async () => {
    console.log("into shopify store");
  };

  const create_supplier = () => {
    set_supplier_options("create_supplier");
    // handle_get_cust_data();
    console.log("iam in create supplier");
  };

  const purchaseOrder_check = () => {
    set_supplier_options("purchase_order");
    // handle_get_cust_data();
    console.log("iam in purchase_order");
  };

  const fetch_user_details = async () => {
    const user = auth.currentUser;

    if (user) {
      email = user.email;
      await axios
        .post(API_LINK + "get_user", email)
        .then((response) => {
          console.log("get user in supplier_create :: ", response.data);
          console.log(typeof response.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handle_create_supplier = (field, value) => {
    setsuppliers_create((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", suppliers_create);
    isFormValid();
  };

  const isFormValid = () => {
    const requiredProperties = [
      "name",
      "phone_number",
    //   "company",
      "category",
      "city",
      "address",
      "country",
    ];
    for (const property of requiredProperties) {
      if (!suppliers_create[property]) {
        console.log(`property is ${property} :: ${suppliers_create[property]}`);
        set_form_validity(false);
        console.log("showing form validity", form_validity);
        return;
      }
      console.log(
        `in true ,property is ${property} :: ${suppliers_create[property]}`
      );
    }

    set_form_validity(true);
    console.log("showing form validity", form_validity);
  };
  // if (
  //   suppliers_create.title !== "" &&
  //   suppliers_create.address !== "" &&
  //   suppliers_create.city !== "" &&
  //   suppliers_create.country !== ""
  // ) {
  //   set_form_validity(true);
  //   console.log("showing form validity", form_validity);
  //   console.log("showing ----------- ",suppliers_create.title);
  // } else {
  //   set_form_validity(false);
  //   console.log("showing form validity", form_validity);
  // }
  //   };

  const timeSetting = () => {
    const currentDate = new Date();

    const utcTimestamp = convertToUTC(currentDate);
    // Format date in 'YYYY-MM-DD' format
    formattedDate = utcTimestamp.split("T")[0];
    // formattedDate = currentDate
    formattedTime = utcTimestamp.split("T")[1].split(".")[0];

    console.log(
      `showing origional ${utcTimestamp}, formatted date and time ${formattedDate}, ${formattedTime}`
    );
  };

  const handleAddPurchaseOrder = () => {
    // Update the supplier_options state to "purchase_order"
    set_supplier_options("purchase_order");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form_validity) {
      // console.log(isFormValid());

      // Get the current user
      const user = auth.currentUser;

      if (user) {
        email = user.email;
        try {
          await handle_create_supplier("email", email);
          console.log("Current user's email:", email);
        } catch (error) {
          console.error("Error handling supplier creation:", error);
        }
      } else {
        console.log("No user is currently signed in.");
      }

    //   timeSetting();
      fetch_user_details();

      const requestData = {
        supplier: {
          name: suppliers_create.name,
          email: email,
          phone_number: suppliers_create.phone_number,
        //   company: suppliers_create.company,
          category: suppliers_create.category,
          city: suppliers_create.city,
          address: suppliers_create.address,
          country: suppliers_create.country,
        },
      };

      console.log("into handle submit", requestData);

      axios
        .post(API_LINK + "create_supplier", requestData)
        .then((response) => {
          console.log("send data to backend :: ", response.data);
          console.log(typeof response.data);
        })
        .catch((err) => console.error(err));

      setsuppliers_create({
        name: "",
        email: "",
        phone_number: "",
        // company: "",
        category: "",
        city: "",
        address: "",
        country: "",
      });
      set_form_validity(false);
    }
  };

  return (
    <div>
      <Container sx={{ height: "88vh" }}>
        <Box margin="10px">
          <Stack spacing={2} direction="row" justifyContent="end">
            <Button
              variant="outlined"
              onClick={create_supplier}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              Add Supplier
            </Button>
            <Button
              variant="outlined"
              onClick={purchaseOrder_check}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              Add Purchase Order
            </Button>
          </Stack>
        </Box>

        {supplier_options === "create_supplier" ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                color: "#593993",
                fontWeight: "bold",
                fontSize: "28px",
                marginTop: "20px",
              }}
            >
              Add Supplier
            </Typography>

            <Grid item lg={6} sx={{ width: "50%" }}>
              <ul>
                <form onSubmit={handleSubmit}>
                  <Stack
                    direction="column"
                    spacing={4}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      id="standard-basic-name"
                      label="Name"
                      variant="standard"
                      value={suppliers_create.name}
                      onChange={(e) =>
                        handle_create_supplier("name", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    <TextField
                      id="standard-basic-email"
                      label="Email"
                      variant="standard"
                      value={suppliers_create.email}
                      onChange={(e) =>
                        handle_create_supplier("email", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    <TextField
                      id="standard-basic-phone_number"
                      label="Phone Number"
                      variant="standard"
                      value={suppliers_create.phone_number}
                      onChange={(e) =>
                        handle_create_supplier("phone_number", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    {/* <TextField
                      id="standard-basic-company"
                      label="Company"
                      variant="standard"
                      value={suppliers_create.company}
                      onChange={(e) =>
                        handle_create_supplier("company", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    /> */}

                    <TextField
                      id="standard-basic-category"
                      label="Category"
                      variant="standard"
                      value={suppliers_create.category}
                      onChange={(e) =>
                        handle_create_supplier("category", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    <TextField
                      id="standard-basic-city"
                      label="City"
                      variant="standard"
                      value={suppliers_create.city}
                      onChange={(e) =>
                        handle_create_supplier("city", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    <TextField
                      id="standard-basic-address"
                      label="Address"
                      variant="standard"
                      value={suppliers_create.address}
                      onChange={(e) => {
                        handle_create_supplier("address", e.target.value);
                        isFormValid();
                      }}
                      required
                      sx={{ width: "100%" }}
                    />

                    <TextField
                      id="standard-basic-country"
                      label="Country"
                      variant="standard"
                      value={suppliers_create.country}
                      onChange={(e) =>
                        handle_create_supplier("country", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />

                    {form_validity ? (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          background:
                            "linear-gradient(45deg, #593993, #9319B5)",
                          boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                          color: "white",
                          width: "50%",
                          borderRadius: "12px",
                        }}
                      >
                        Create
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          background:
                            "linear-gradient(45deg, #593993, #9319B5)",
                          boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                          color: "white",
                          width: "50%",
                          borderRadius: "12px",
                        }}
                        // onClick={handleSubmit}
                        disabled={!form_validity}
                      >
                        Create
                      </Button>
                    )}
                  </Stack>
                </form>
              </ul>
            </Grid>
          </Grid>
        ) : supplier_options === "purchase_order" ? (
          <div>
            <Purchase_Order onAddPurchaseOrder={handleAddPurchaseOrder} />
            {/* <Dashboard_Cards />
                <Warehouse_list /> */}
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default Suppliers_create;
