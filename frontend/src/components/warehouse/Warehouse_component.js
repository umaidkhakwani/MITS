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

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function Warehouse_ftn() {
  const [warehouse_options, set_warehouse_options] = useState("");
  const [responseData_customers, setresponseData_customers] = useState(null);
  const [page_options, set_page_options] = useState("");
  const [form_validity, set_form_validity] = useState(false);
  const [warehouse_data, set_warehouse_data] = React.useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
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
    setSelectedStores(store)
    // if (selectedStores.includes(store)) {
    //   setSelectedStores(selectedStores.filter((s) => s !== store));
    // } else {
    //   setSelectedStores([...selectedStores, store]);
    // }
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
    //   return <div key={store}>Selected Store: {store}</div>;
  };
  const handle_create_warehouse = (field, value) => {
    // setInventory(event.target.value);
    // console.log("showing", event.target.value);
    setwarehouse_create((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", warehouse_create);
  };

  //   const sorting_function = () => {
  //     if (responseData_customers) {
  //       sortedCustomers = responseData_customers
  //         .slice()
  //         .sort((a, b) => b.orders_count - a.orders_count);
  //     }
  //   };

  const create_warehouse = () => {
    set_warehouse_options("create_warehouse");
    // handle_get_cust_data();
    set_page_options("create_warehouse");
    console.log("iam in create warehouse");
  };


  const inventory_check = () => {
    set_warehouse_options("inventory");
    // handle_get_cust_data();
    set_page_options("create_warehouse");
    console.log("iam in create warehouse");
  };

  const order_placement = () => {
    set_warehouse_options("place_order");
    // handle_get_cust_data();
    set_page_options("create_warehouse");
    console.log("iam in create warehouse");
  };

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

    // Adjust the UTC offset to -4 hours
    // const utcOffsetHours = -4;
    // utcTimestamp.setHours(utcTimestamp.getHours());

    // Format date in 'YYYY-MM-DD' format
    formattedDate = utcTimestamp.split("T")[0];
    // formattedDate = currentDate
    formattedTime = utcTimestamp.split('T')[1].split('.')[0];

    // Format time in 'HH:mm:ss' format (24-hour clock)
    // formattedTime = utcTimestamp.toLocaleTimeString("en-US", {
    //   hour12: false,
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // });

    console.log(`showing origional ${utcTimestamp}, formatted date and time ${formattedDate}, ${formattedTime}`);
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
      <Container>
        <h1>iam in Warehouse</h1>
        <Box margin="10px">
          <Stack spacing={2} direction="row" justifyContent="space-evenly">
            <Button variant="outlined" onClick={create_warehouse}>
              Create Warehouse
            </Button>
            <Button variant="outlined" onClick={inventory_check}>
              Inventory
            </Button>
            <Button variant="outlined" onClick={order_placement}>
              place order
            </Button>
          </Stack>
        </Box>
        <div>
          {warehouse_options === "create_warehouse" ? (
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
          ) : warehouse_options === "inventory" ? (
            <div>
              <Inventory_ftn />
            </div>
          ) : warehouse_options === "place_order" ? (
            <div>
              {/* <Warehouse_orders /> */}
            </div>
          ) :(
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default Warehouse_ftn;
