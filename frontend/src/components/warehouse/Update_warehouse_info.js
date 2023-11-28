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

const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";

function Update_warehouse_info(props) {
  const [form_validity, set_form_validity] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [warehouseTotal, setWarehouseTotal] = useState([]);
  const [finish, setfinish] = useState(true); // Initialize with an empty string

  const [InventoryProducts, setInventoryProducts] = useState([
    {
      title: "",
      SKU: "",
      Quantity: "",
      Country: "",
      City: "",
      Address: "",
    },
  ]);

  const { row } = props;
  var email = "";
  const user = auth.currentUser;
  var warehouse_total_products = [];

  // const displaySelectedStores = async () => {
  //   // console.log("stores", selectedStores);

  //   const requestData = {
  //     email: email,
  //     title: warehouse_name_value,
  //   };
  //   console.log("requestData before get_warehouse_specified", requestData);
  //   await axios
  //     .post(API_LINK + "get_warehouse_specified", requestData)
  //     .then((response) => {
  //       warehouse_total_products = response.data[0];
  //       console.log(
  //         "showing email and title from warehouse :: ",
  //         warehouse_total_products.association
  //       );
  //       //   setWarehouseTotal(warehouse_total_products);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Error fetching email and title from warehouse");
  //     });

  // };

  // const fetchProductCount = async () => {
  //   console.log("iam in fetchProductCount");
  //   if (user) {
  //     email = user.email;
  //     try {
  //       console.log("Current user's email:", email);
  //       console.log("Current warehouse name:", warehouse_name_value);
  //     } catch (error) {
  //       console.error("Error handling warehouse creation:", error);
  //     }
  //   } else {
  //     console.log("No user is currently signed in.");
  //   }

  //   const requestData = {
  //     email: email,
  //     warehouse: warehouse_name_value,
  //   };
  //   axios
  //     .post(API_LINK + "get_warehouse_products", requestData)
  //     .then((response) => {
  //       warehouse_total_products = response.data[0];
  //       console.log(
  //         "showing data from warehouse products :: ",
  //         warehouse_total_products
  //       );
  //       setWarehouseTotal(warehouse_total_products);

  //       console.log(typeof response.data);
  //       let total = 0;

  //       for (let i = 0; i < warehouse_total_products.length; i++) {
  //         total += warehouse_total_products[i].quantity;
  //       }
  //       console.log("Total quantity:", total);
  //       setProductCount(total);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Error fetching product data");
  //     });
  // };

  const handle_inventory_products = (index, field, value) => {
    setInventoryProducts((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      console.log("showing updated Items", updatedItems);
      return updatedItems;
    });
  };

  // umaidkhakwani92@gmail.com
  // 12345678

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form_validity) {
      console.log("showing row ", row);
      console.log("showing product list ", InventoryProducts[0]);
      var value = false;  
      props.onsubmitting(value);
      // if (user) {
      //   email = user.email;
      //   try {
      //     console.log("Current user's email:", email);
      //     console.log("Current warehouse name:", warehouse_name_value);
      //   } catch (error) {
      //     console.error("Error handling warehouse creation:", error);
      //   }
      // } else {
      //   console.log("No user is currently signed in.");
      // }

      // displaySelectedStores();

      // // Get the current user
      // //   const user = auth.currentUser;

      // if (user) {
      //   email = user.email;
      //   try {
      //     await handle_inventory_products("email", email);
      //     console.log("Current user's email:", email);
      //     console.log("Current warehouse name:", warehouse_name_value);
      //   } catch (error) {
      //     console.error("Error handling warehouse creation:", error);
      //   }
      // } else {
      //   console.log("No user is currently signed in.");
      // }
      // InventoryProducts[0].email = email;
      // InventoryProducts[0].warehouse = warehouse_name_value;
      // // InventoryProducts[0].barcode = 1234;

      // console.log("showing product details ", InventoryProducts[0]);

      // const requestData = {
      //   product: InventoryProducts[0],
      // };

      // console.log("into handle submit", requestData);

      // axios
      //   .post(API_LINK + "create_warehouse_products", requestData)
      //   .then((response) => {
      //     console.log("send data to backend :: ", response.data);
      //     console.log(typeof response.data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     alert("SKU should be UNIQUE");
      //   });
      // fetchProductCount();
      setInventoryProducts([
        {
          title: "",
          SKU: "",
          Quantity: "",
          Country: "",
          City: "",
          Address: "",
        },
      ]);
      //   set_form_validity(false);
    }
  };

  const isFormValid = () => {
    const requiredProperties = [
      "title",
      "SKU",
      "Quantity",
      "Country",
      "City",
      "Address",
    ];
    console.log(
      "showing InventoryProducts in formValid ",
      InventoryProducts[0]
    );

    for (const property of requiredProperties) {
      if (!InventoryProducts[0][property]) {
        console.log(
          `property is ${property} :: ${InventoryProducts[0][property]}`
        );
        set_form_validity(false);
        console.log("showing form validity", form_validity);
        return;
      }
      console.log(
        `in true ,property is ${property} :: ${InventoryProducts[0][property]}`
      );
    }

    set_form_validity(true);
    console.log("showing form validity", form_validity);
  };

  useEffect(() => {
    console.log("Updated InventoryProducts[0]", InventoryProducts[0]);
    isFormValid();
  }, [InventoryProducts]);

  useEffect(() => {
    //   fetchProductCount();
    setInventoryProducts([
      {
        title: "",
        SKU: "",
        Quantity: "",
        Country: "",
        City: "",
        Address: "",
      },
    ]);
  }, []);

  return (
    <div>
      <Container>
        <div>
          <Stack direction="row" spacing={10}>
            <form onSubmit={handleSubmit}>
              {InventoryProducts.map((product, index) =>
                Object.keys(product).map((property) => {
                  {
                    /* if (
                        property !== "email" &&
                        property !== "warehouse" 
                      ) { */
                  }
                  return (
                    <TextField
                      key={`${index}-${property}`}
                      id={`standard-basic-${index}-${property}`}
                      label={`${
                        property.charAt(0).toUpperCase() + property.slice(1)
                      } ${property === "SKU" ? "e.g 12345" : ""}`}
                      variant="standard"
                      value={product[property]}
                      onChange={(e) => {
                        handle_inventory_products(
                          index,
                          property,
                          e.target.value
                        );
                        isFormValid();
                      }}
                      required
                    />
                  );
                  {
                    /* } else {
                        return null;
                      } */
                  }
                })
              )}

              {form_validity ? (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ margin: "0px 20px" }}
                >
                  Create
                </Button>
              ) : (
                <Button
                  variant="contained"
                  // onClick={handleSubmit}
                  disabled={!form_validity}
                  sx={{ margin: "0px 20px" }}
                >
                  Create
                </Button>
              )}
            </form>
          </Stack>
        </div>
      </Container>
    </div>
  );
}

export default Update_warehouse_info;
