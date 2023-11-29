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

import Inventory_ftn from "./Inventory";
import Transfer_Stock from "./Transfer_Stock";
import convertToUTC from "../UTC_converter";
import Dashboard_Cards from "../../containers/cards";
import Warehouse_list from "./Warehouse_list";
import Inventory_warehouse from "./Inventory_warehouse";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create_pos from "../POS/Create_POS";

import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function Warehouse_create() {
  const [form_validity, set_form_validity] = useState(false);
  const [selectedStores, setSelectedStores] = useState(["other"]);
  const [page_options, set_page_options] = useState("inventory");
  const [warehouse_options, set_warehouse_options] = useState("inventory");

  const [warehouse_create, setwarehouse_create] = useState([
    {
      email: "",
      title: "",
      address: "",
      city: "",
      country: "",
      association: "",
      date: "",
      time: "",
    },
  ]);


  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in create warehouse", company2[0]);

  var email = "";

  const handleStoreChange = (store) => {
    setSelectedStores(store);
  };

  const shopify_store_addProduct = async () => {
    console.log("into shopify store");
  };

  const create_warehouse = () => {
    set_warehouse_options("create_warehouse");
    // handle_get_cust_data();
    set_page_options("create_warehouse");
    console.log("iam in create warehouse");
  };

  const create_pos = () => {
    set_warehouse_options("create_pos");
    // handle_get_cust_data();
    set_page_options("create_pos");
    console.log("iam in create warehouse");
  };

  const inventory_check = () => {
    set_warehouse_options("inventory");
    // handle_get_cust_data();
    set_page_options("create_warehouse");
    console.log("iam in create warehouse");
  };
  const displaySelectedStores = () => {
    console.log("stores", selectedStores);

    if (selectedStores === "Shopify") {
      shopify_store_addProduct();
    } else if (selectedStores === "other") {
      console.log("selected store == other");
      // WooCommerceFunction();
    }
  };
  const handle_create_warehouse = (field, value) => {
    setwarehouse_create((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", warehouse_create);
  };

  const isFormValid = () => {
    const requiredProperties = ["title", "address", "city", "country"];
    for (const property of requiredProperties) {
      if (!warehouse_create[property]) {
        console.log(`property is ${property} :: ${warehouse_create[property]}`);
        set_form_validity(false);
        console.log("showing form validity", form_validity);
        return;
      }
      console.log(
        `in true ,property is ${property} :: ${warehouse_create[property]}`
      );
    }

    set_form_validity(true);
    console.log("showing form validity", form_validity);
  };
  // if (
  //   warehouse_create.title !== "" &&
  //   warehouse_create.address !== "" &&
  //   warehouse_create.city !== "" &&
  //   warehouse_create.country !== ""
  // ) {
  //   set_form_validity(true);
  //   console.log("showing form validity", form_validity);
  //   console.log("showing ----------- ",warehouse_create.title);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form_validity) {
      displaySelectedStores();
      // console.log(isFormValid());

      // Get the current user
      const user = auth.currentUser;
      var filteredCompanies;
      if (user) {
        email = user.email;
        filteredCompanies = company2.filter(
          (company) => company.email === email
        );
        console.log("filtered companies", filteredCompanies[0]);
        // try {
        //   await handle_create_warehouse("email", email);
        //   console.log("Current user's email:", email);
        // } catch (error) {
        //   console.error("Error handling warehouse creation:", error);
        // }
      } else {
        console.log("No user is currently signed in.");
      }

      timeSetting();

      const requestData = {
        product: {
          email: email,
          title: warehouse_create.title,
          address: warehouse_create.address,
          city: warehouse_create.city,
          country: warehouse_create.country,
          association: selectedStores,
          company: filteredCompanies[0].company,
          date: formattedDate,
          time: formattedTime,
        },
      };

      console.log("into handle submit", requestData);

      axios
        .post(API_LINK + "create_warehouse", requestData)
        .then((response) => {
          console.log("send data to backend :: ", response.data);
          console.log(typeof response.data);
        })
        .catch((err) => console.error(err));

      setwarehouse_create({
        title: "",
        address: "",
        city: "",
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
              onClick={create_pos}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              {/* Create POS */}
              Create POS
            </Button>
            <Button
              variant="outlined"
              onClick={create_warehouse}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              {/* Create Warehouse */}
              Create Warehouse
            </Button>
            <Button
              variant="outlined"
              onClick={inventory_check}
              sx={{ color: "#593993", borderColor: "#593993" }}
            >
              Inventory
            </Button>
          </Stack>
        </Box>

        {warehouse_options === "create_pos" ? (
          <Create_pos />
        ) : warehouse_options === "create_warehouse" ? (
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
              {/* Add your Warehouse */}
              Add your Warehouse
            </Typography>

            {/* <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Choose Store
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Shopify"
                  control={<Radio />}
                  label="Shopify"
                  onChange={() => handleStoreChange("Shopify")}
                />
                <FormControlLabel
                  value="Woo-commerce"
                  control={<Radio />}
                  label="Woo-commerce"
                  onChange={() => handleStoreChange("Woo-commerce")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={() => handleStoreChange("other")}
                />
              </RadioGroup>
            </FormControl>
          </div> */}

            <Grid item lg={6} sx={{ width: "50%" }}>
              <ul>
                <form onSubmit={handleSubmit}>
                  <Stack
                    direction="column"
                    spacing={4}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      id="standard-basic-1"
                      label="Title e.g (Amanah Mall warehouse)"
                      variant="standard"
                      value={warehouse_create.title}
                      onChange={(e) =>
                        handle_create_warehouse("title", e.target.value)
                      }
                      required
                      sx={{ width: "100%" }}
                    />
                    <TextField
                      id="standard-basic-1"
                      label="Address e.g (Model town link road)"
                      variant="standard"
                      value={warehouse_create.address}
                      onChange={(e) => {
                        handle_create_warehouse("address", e.target.value);
                        isFormValid();
                      }}
                      required
                      sx={{ width: "100%" }}
                    />
                    <TextField
                      id="standard-basic-1"
                      label="City"
                      variant="standard"
                      value={warehouse_create.city}
                      onChange={(e) => {
                        handle_create_warehouse("city", e.target.value);
                        isFormValid();
                      }}
                      required
                      sx={{ width: "100%" }}
                    />
                    <TextField
                      id="standard-basic-1"
                      label="Country"
                      variant="standard"
                      value={warehouse_create.country}
                      onChange={(e) => {
                        handle_create_warehouse("country", e.target.value);
                        isFormValid();
                      }}
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
        ) : warehouse_options === "inventory" ? (
          <div>
            <Inventory_warehouse />
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

export default Warehouse_create;
