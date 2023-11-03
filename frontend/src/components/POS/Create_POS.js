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
import convertToUTC from "../UTC_converter";

import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function Create_pos() {
  const [form_validity, set_form_validity] = useState(false);
  const [selectedStores, setSelectedStores] = useState(["other"]);
  const [page_options, set_page_options] = useState(false);
  const [warehouse_options, set_warehouse_options] = useState("inventory");

  const [create_shopify_pos, setcreate_shopify_pos] = useState([
    {
      store_name: "",
      api_key: "",
      token_pass: "",
    },
  ]);

  const [create_pos, setcreate_pos] = useState([
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
  console.log("showing company2 in create pos", company2[0]);

  var email = "";

  const handleStoreChange = (store) => {
    setSelectedStores(store);
    if (store === "Shopify") {
      set_page_options(true);
    } else {
      set_page_options(false);
    }
  };

  const shopify_store_addProduct = async () => {
    console.log("into shopify store");
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

  const handle_create_shopify_warehouse = (field, value) => {
    setcreate_shopify_pos((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created shopify products", create_shopify_pos);
  };

  const handle_create_warehouse = (field, value) => {
    setcreate_pos((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", create_pos);
  };

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

  const isFormValid = () => {
    const requiredProperties = ["title", "address", "city", "country"];
    for (const property of requiredProperties) {
      if (!create_pos[property]) {
        console.log(`property is ${property} :: ${create_pos[property]}`);
        set_form_validity(false);
        console.log("showing form validity", form_validity);
        return;
      }
      console.log(
        `in true ,property is ${property} :: ${create_pos[property]}`
      );
    }

    set_form_validity(true);
    console.log("showing form validity", form_validity);
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

      console.log("showing selected stores in create pos", selectedStores);

      let requestData = {};

      // if (selectedStores === "Shopify") {
        requestData = {
          product: {
            email: email,
            store_name: create_shopify_pos.store_name || "",
            api_key: create_shopify_pos.api_key || "",
            token_pass: create_shopify_pos.token_pass || "",
            title: create_pos.title,
            address: create_pos.address,
            city: create_pos.city,
            country: create_pos.country,
            association: selectedStores,
            company: filteredCompanies[0].company,
            date: formattedDate,
            time: formattedTime,
          },
        };
      // } else {
      //   requestData = {
      //     product: {
      //       email: email,
      //       title: create_pos.title,
      //       address: create_pos.address,
      //       city: create_pos.city,
      //       country: create_pos.country,
      //       association: selectedStores,
      //       company: filteredCompanies[0].company,
      //       date: formattedDate,
      //       time: formattedTime,
      //     },
      //   };
      // }

      console.log("into handle submit", requestData);

      axios
        .post(API_LINK + "create_warehouse", requestData)
        .then((response) => {
          console.log("send data to backend :: ", response.data);
          console.log(typeof response.data);
        })
        .catch((err) => console.error(err));

      setcreate_shopify_pos({
        store_name: "",
        api_key: "",
        token_pass: "",
      });

      set_page_options(false);

      setcreate_pos({
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
            Add POS
          </Typography>

          <Grid item lg={6} sx={{ width: "50%" }}>
            <div>
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
            </div>
            <ul>
              <form onSubmit={handleSubmit}>
                <Stack
                  direction="column"
                  spacing={4}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  {page_options ? (
                    <Container
                      direction="column"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <TextField
                        id="standard-basic-1"
                        label="Shopify Store Name"
                        variant="standard"
                        value={create_shopify_pos.store_name}
                        onChange={(e) =>
                          handle_create_shopify_warehouse(
                            "store_name",
                            e.target.value
                          )
                        }
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Shopify API Key"
                        variant="standard"
                        value={create_shopify_pos.api_key}
                        onChange={(e) =>
                          handle_create_shopify_warehouse(
                            "api_key",
                            e.target.value
                          )
                        }
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Shopify Token Password"
                        variant="standard"
                        value={create_shopify_pos.token_pass}
                        onChange={(e) =>
                          handle_create_shopify_warehouse(
                            "token_pass",
                            e.target.value
                          )
                        }
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Title e.g (Amanah Mall warehouse)"
                        variant="standard"
                        value={create_pos.title}
                        onChange={(e) =>
                          handle_create_warehouse("title", e.target.value)
                        }
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Address e.g (Model town link road)"
                        variant="standard"
                        value={create_pos.address}
                        onChange={(e) => {
                          handle_create_warehouse("address", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="City"
                        variant="standard"
                        value={create_pos.city}
                        onChange={(e) => {
                          handle_create_warehouse("city", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Country"
                        variant="standard"
                        value={create_pos.country}
                        onChange={(e) => {
                          handle_create_warehouse("country", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                    </Container>
                  ) : (
                    <div>
                      <TextField
                        id="standard-basic-1"
                        label="Title e.g (Amanah Mall warehouse)"
                        variant="standard"
                        value={create_pos.title}
                        onChange={(e) =>
                          handle_create_warehouse("title", e.target.value)
                        }
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Address e.g (Model town link road)"
                        variant="standard"
                        value={create_pos.address}
                        onChange={(e) => {
                          handle_create_warehouse("address", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="City"
                        variant="standard"
                        value={create_pos.city}
                        onChange={(e) => {
                          handle_create_warehouse("city", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                      <TextField
                        id="standard-basic-1"
                        label="Country"
                        variant="standard"
                        value={create_pos.country}
                        onChange={(e) => {
                          handle_create_warehouse("country", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%", margin: "10px 0px" }}
                      />
                    </div>
                  )}

                  {form_validity ? (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background: "linear-gradient(45deg, #593993, #9319B5)",
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
                        background: "linear-gradient(45deg, #593993, #9319B5)",
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
      </Container>
    </div>
  );
}

export default Create_pos;
