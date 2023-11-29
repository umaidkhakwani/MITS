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
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";
var sortedCustomers = "";

function Products_create(props) {
  const [warehouse_options, set_warehouse_options] = useState("");
  const [responseData_customers, setresponseData_customers] = useState(null);
  const [page_options, set_page_options] = useState("");
  const [form_validity, set_form_validity] = useState(false);
  const [warehouse_data, set_warehouse_data] = React.useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
  const [productCount, setProductCount] = useState(0);
  const [warehouseTotal, setWarehouseTotal] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [primary_warehouse, setprimary_warehouse] = useState("");

  const [InventoryProducts, setInventoryProducts] = useState([
    {
      company: "",
      email: "",
      warehouse: "",
      title: "",
      description: "",
      picture_url: "",
      cost_price: "",
      retail_price: "",
      quantity: "",
      SKU: "",
      barcode: "",
      weight: "",
      size: "",
      color: "",
    },
  ]);

  var warehouse_name_value = props.warehouse_name;
  var email = "";
  const user = auth.currentUser;
  var warehouse_total_products = [];

  const company2 = useSelector((state) => state.users);

//   console.log("showing company2", company2);

  const fetch_primary_warehouse = async () => {
    if (user) {
      email = user.email;
      const requestData = {
        email: email,
      };
      await axios
        .post(API_LINK + "get_primary_warehouse", requestData)
        .then((response) => {
          // setProducts(response.data.products);
          console.log(
            "getting primary warehouse details :: ",
            response.data[0]
          );
          warehouse_name_value = response.data[0].title;
          setprimary_warehouse(response.data[0].title);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetch_primary_warehouse();
  }, []);

  const transfer_stock = () => {
    set_warehouse_options("transfer_stock");
    // handle_get_cust_data();
    set_page_options("transfer_stock");
    console.log("iam in transfer_stock");
  };

  const handleStoreChange = (store) => {
    if (selectedStores.includes(store)) {
      setSelectedStores(selectedStores.filter((s) => s !== store));
    } else {
      setSelectedStores([...selectedStores, store]);
    }
  };

  const shopify_store_addProduct = async () => {
    console.log(" into shopify store");
    console.log(InventoryProducts);
    const requestData = {
      product: InventoryProducts[0],
    };
    console.log("into shopify handle submit", requestData);
    await axios
      .post(API_LINK + "create_product", requestData)
      .then((response) => {
        // setProducts(response.data.products);
        console.log("backend data :: ", response.data);
        console.log(typeof response.data.products);
      })
      .catch((err) => console.error(err));
  };

  const displaySelectedStores = async () => {
    // console.log("stores", selectedStores);

    const requestData = {
      email: email,
      title: warehouse_name_value,
    };
    console.log("requestData before get_warehouse_specified", requestData);
    await axios
      .post(API_LINK + "get_warehouse_specified", requestData)
      .then((response) => {
        warehouse_total_products = response.data[0];
        console.log(
          "showing email and title from warehouse :: ",
          warehouse_total_products.association
        );
        //   setWarehouseTotal(warehouse_total_products);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching email and title from warehouse");
      });
    if (warehouse_total_products.association === "Shopify") {
      console.log("showing selected warehouse store :: Shopify");
      shopify_store_addProduct();
    } else if (warehouse_total_products.association === "Woo-commerce") {
      console.log("showing selected warehouse store :: Woo-commerce");
    } else {
      console.log("showing selected warehouse store :: other");
    }

    // selectedStores.map((store) => {
    //   if (store === "Shopify") {
    //     shopify_store_addProduct();
    //   } else if (store === "Woo-commerce") {
    //     // WooCommerceFunction();
    //   }
    //   //   return <div key={store}>Selected Store: {store}</div>;
    // });
  };

  const fetchProductCount = async () => {
    fetch_primary_warehouse();
    console.log("iam in fetchProductCount");
    if (user) {
      email = user.email;
      try {
        console.log("Current user's email:", email);
        console.log("Current warehouse name:", warehouse_name_value);
      } catch (error) {
        console.error("Error handling warehouse creation:", error);
      }
    } else {
      console.log("No user is currently signed in.");
    }

    const requestData = {
      email: email,
      warehouse: warehouse_name_value,
    };
    axios
      .post(API_LINK + "get_warehouse_products", requestData)
      .then((response) => {
        warehouse_total_products = response.data[0];
        console.log(
          "showing data from warehouse products :: ",
          warehouse_total_products
        );
        setWarehouseTotal(warehouse_total_products);

        console.log(typeof response.data);
        let total = 0;

        for (let i = 0; i < warehouse_total_products.length; i++) {
          total += warehouse_total_products[i].quantity;
        }
        console.log("Total quantity:", total);
        setProductCount(total);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching product data");
      });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let user_company = {};

    if (form_validity) {
      if (user) {
        email = user.email;
        user_company = company2.find((obj) => obj.email === email);
        console.log("showing user company", user_company.company);
        try {
          console.log("Current user's email:", email);
          console.log("Current warehouse name:", warehouse_name_value);
        } catch (error) {
          console.error("Error handling warehouse creation:", error);
        }
      } else {
        console.log("No user is currently signed in.");
      }

      //   displaySelectedStores();

      // Get the current user
      //   const user = auth.currentUser;

      if (user) {
        email = user.email;
        try {
          await handle_inventory_products("email", email);
          console.log("Current user's email:", email);
          console.log("Current warehouse name:", warehouse_name_value);
        } catch (error) {
          console.error("Error handling warehouse creation:", error);
        }
      } else {
        console.log("No user is currently signed in.");
      }
      console.log("safsa", company2[0].company);
      InventoryProducts[0].email = email;
      InventoryProducts[0].warehouse = primary_warehouse;
      InventoryProducts[0].company = user_company.company;

      // InventoryProducts[0].barcode = 1234;

      console.log("showing product details ", InventoryProducts[0]);

      const requestData = {
        product: InventoryProducts[0],
      };

      console.log("into handle submit", requestData);

      axios
        .post(API_LINK + "create_warehouse_products", requestData)
        .then((response) => {
          console.log("send data to backend :: ", response.data);
          console.log(typeof response.data);
        })
        .catch((err) => {
          console.error(err);
          alert("SKU should be UNIQUE");
        });
      fetchProductCount();
      setInventoryProducts([
        {
          title: "",
          description: "",
          picture_url: "",
          cost_price: "",
          retail_price: "",
          quantity: "",
          SKU: "",
          barcode: "",
          weight: "",
          size: "",
          color: "",
        },
      ]);
      //   set_form_validity(false);
    }
  };

  const isFormValid = () => {
    const requiredProperties = [
      "title",
      "picture_url",
      "cost_price",
      "retail_price",
      "quantity",
      "SKU",
      "barcode",
      "weight",
      "size",
      "color",
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
    fetchProductCount();
    set_warehouse_options("");
    setInventoryProducts([
      {
        title: "",
        description: "",
        picture_url: "",
        cost_price: "",
        retail_price: "",
        quantity: "",
        SKU: "",
        barcode: "",
        weight: "",
        size: "",
        color: "",
      },
    ]);
  }, [warehouse_name_value]);

  return (
    <div>
      <h1>{warehouse_name_value}</h1>
      {/* <Button variant="outlined" onClick={transfer_stock}>
                Transfer Stock
              </Button>
          {warehouse_options === "transfer_stock" ? <Transfer_Stock  warehouse_name={warehouse_name_value}/> : ""}     */}
      {/* <h1>Total products {productCount}</h1> */}

      <Container>
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
            Add Product
          </Typography>

          <Grid item lg={6} sx={{ width: "50%" }}>
            <ul>
              <form onSubmit={handleSubmit}>
                <Stack
                  direction="column"
                  spacing={4}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  {InventoryProducts.map((product, index) =>
                    Object.keys(product).map((property) => {
                      if (property !== "email" && property !== "warehouse") {
                        return (
                          <TextField
                            key={`${index}-${property}`}
                            id={`standard-basic-${index}-${property}`}
                            label={`${
                              property.charAt(0).toUpperCase() +
                              property.slice(1)
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
                            sx={{ width: "100%" }}
                          />
                        );
                      } else {
                        return null;
                      }
                    })
                  )}

                  {form_validity ? (
                    <Button
                      variant="contained"
                      type="submit"
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
                      // onClick={handleSubmit}
                      disabled={!form_validity}
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

export default Products_create;
