import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Inventory_ftn from "./Inventory";
import Transfer_Stock from "./Transfer_Stock";
import convertToUTC from "../UTC_converter";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function Warehouse_create() {
  const [form_validity, set_form_validity] = useState(false);
  const [selectedStores, setSelectedStores] = useState([]);
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

  var email = "";

  const handleStoreChange = (store) => {
    setSelectedStores(store);
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
  const handle_create_warehouse = (field, value) => {
    setwarehouse_create((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", warehouse_create);
  };

  const isFormValid = () => {
    if (
      warehouse_create.title !== "" &&
      warehouse_create.address !== "" &&
      warehouse_create.city !== "" &&
      warehouse_create.country !== ""
    ) {
      set_form_validity(true);
      console.log("showing form validity", form_validity);
      console.log(warehouse_create);
    } else {
      set_form_validity(false);
      console.log("showing form validity", form_validity);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form_validity) {
      displaySelectedStores();
      // console.log(isFormValid());

      // Get the current user
      const user = auth.currentUser;

      if (user) {
        email = user.email;
        try {
          await handle_create_warehouse("email", email);
          console.log("Current user's email:", email);
        } catch (error) {
          console.error("Error handling warehouse creation:", error);
        }
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
      <Container sx={{height:"100%"}}>
        <h1>Add your Warehouse</h1>

        <div>
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
              <Stack direction="column" spacing={4}>
                <TextField
                  id="standard-basic-1"
                  label="Title e.g (Amanah Mall warehouse)"
                  variant="standard"
                  value={warehouse_create.title}
                  onChange={(e) =>
                    handle_create_warehouse("title", e.target.value)
                  }
                  required
                />
                <TextField
                  id="standard-basic-1"
                  label="Address e.g (Model town link road)"
                  variant="standard"
                  value={warehouse_create.vendor}
                  onChange={(e) => {
                    handle_create_warehouse("address", e.target.value);
                    isFormValid();
                  }}
                  required
                />
                <TextField
                  id="standard-basic-1"
                  label="City"
                  variant="standard"
                  value={warehouse_create.price}
                  onChange={(e) => {
                    handle_create_warehouse("city", e.target.value);
                    isFormValid();
                  }}
                  required
                />
                <TextField
                  id="standard-basic-1"
                  label="Country"
                  variant="standard"
                  value={warehouse_create.sku}
                  onChange={(e) => {
                    handle_create_warehouse("country", e.target.value);
                    isFormValid();
                  }}
                  required
                />
                {form_validity ? (
                  <Button variant="contained" type="submit">
                    Create
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    // onClick={handleSubmit}
                    disabled={!form_validity}
                  >
                    Create
                  </Button>
                )}
              </Stack>
            </form>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Warehouse_create;
