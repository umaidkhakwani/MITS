import {
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
import Inventory_ftn from "./Inventory";
import {
  Unstable_NumberInput as NumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import List_ftn_all from "../../containers/List_ftn_all";

//----------------------------------------------------------------------------------------------

const StyledInputRoot = styled("div")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
  
    &.${numberInputClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
  `
);

const StyledButton = styled("button")(
  ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 19px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.2;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 0;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;
      grid-row: 1/2;
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;
    }
  `
);

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

//-----------------------------------------------------------------------------------------------

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";
var sortedCustomers = "";

function Transfer_Stock(props) {
  const [warehouse_index, set_warehouse_index] = React.useState("");
  const [warehouse_index_SKU, set_warehouse_index_SKU] = React.useState("");
  const [warehouse_data, set_warehouse_data] = React.useState("");
  const [warehouse_all_data, set_warehouse_all_data] = React.useState([]);
  const [SKU_quantity, set_SKU_quantity] = React.useState(0);
  const [value, setValue] = useState(0);
  const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
  const [submit_set, set_submit] = useState(false);
  const [transfer, set_transfer] = useState([
    {
      email: "",
      sku: "",
      from_warehouse: "",
      to_warehouse: "",
      quantity: 0,
    },
  ]);

  const warehouse_name_value = props.warehouse_name;
  var email_user = "";
  const user = auth.currentUser;

  //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index

  var warehouse_list = "";
  //   console.log("showing obj1 ", props.obj1);

  const fetch_warehouse_product_data = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email_user = user.email;
        // console.log("Current user's email:", email_user);
        // console.log("Current user's email 2 :", email_user);
        axios
          .post(API_LINK + "get_all_warehouse_products", { email: email_user })
          .then((response) => {
            // setProducts(response.data.products);
            console.log("showing all warehouse list :: ", response.data[0]);
            // console.log(typeof response.data);
            if (response.data[0]) {
              // set_warehouse_all_data(response.data[0]);

              
              const emailAndTitleArray = response.data[0].map((row) => ({
                id: row.id,
                warehouse: row.warehouse || "", // Replace null with ""
                SKU: row.SKU || "", // Replace null with ""
                quantity: row.quantity || 0,
              }));
              console.log("showing emailAndTitleArray", emailAndTitleArray)
              set_warehouse_all_data(emailAndTitleArray);
            }
          })
          .catch((err) => console.error(err));
      } else {
        console.log("No user is currently signed in.");
      }
    });
  };

  const handleMenuItemClick = (index) => () => {
    handle_check(index); // Call handle_check only when the MenuItem is clicked
    console.log("showing index ", index);
  };

  const handleMenuItemClick_SKU = (index) => () => {
    handle_check_SKU(index); // Call handle_check only when the MenuItem is clicked
    console.log("showing index ", index);
  };

  const handle_check = (index) => {
    set_warehouse_index(index);
    console.log("showing index", index);
    console.log("showing warehouse_list", warehouse_list);
  };

  const handle_check_SKU = (index) => {
    set_warehouse_index_SKU(index);
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email_user = user.email;
      }
    });
    fetch_data();
  }, []);

  useEffect(() => {
    fetch_warehouse_product_data();
  }, [warehouse_name_value]);

  useEffect(() => {
    if(isTransferSuccessful){
    console.log("yayyy")
    setIsTransferSuccessful(false)
    fetch_warehouse_product_data();
    }
  }, [warehouse_all_data]);


  const handleChange = (event) => {
    const selectedValue = event.target.value;

    // Assuming you're using Firebase Auth
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email_user = user.email
        console.log("showing user ", email_user)
        set_warehouse_index(event.target.value); // Update selected inventory
        if (event.target.value !== null) {
          console.log(
            "showing warehouse_data of menuitem ",
            warehouse_data[event.target.value]
          );
          const selectedItem = warehouse_data[event.target.value];

          // Create a copy of the current transfer state
          const updatedTransfer = [...transfer];

          // Update the sku field of the selected item in the copy
          updatedTransfer[0].to_warehouse = selectedItem.title;
          updatedTransfer[0].from_warehouse = warehouse_name_value;
          updatedTransfer[0].email = email_user;

          // Set the updated copy as the new transfer state
          set_transfer(updatedTransfer);
          console.log("showing SKU in loop ", selectedItem.SKU);
        }
      }
    });
  };

  const handleChange_SKU = (event) => {
    // console.log("iam in handle change :: ",event.target.value);
    set_warehouse_index_SKU(event.target.value); // Update selected inventory
    if (event.target.value !== null) {
      console.log(
        "showing value of menuitem in warehouse all data ",
        warehouse_all_data[event.target.value]
      );
      set_SKU_quantity(warehouse_all_data[event.target.value].quantity);
      console.log(
        "showing quantity ",
        warehouse_all_data[event.target.value].quantity
      );

      const selectedItem = warehouse_all_data[event.target.value];

      // Create a copy of the current transfer state
      const updatedTransfer = [...transfer];

      // Update the sku field of the selected item in the copy
      updatedTransfer[0].sku = selectedItem.SKU;

      // Set the updated copy as the new transfer state
      set_transfer(updatedTransfer);

      console.log("showing SKU in loop ", selectedItem.SKU);
    }
  };

  const handle_quantity = (val) => {
    // Create a copy of the current transfer state
    const updatedTransfer = [...transfer];

    // Update the sku field of the selected item in the copy
    updatedTransfer[0].quantity = val;

    // Set the updated copy as the new transfer state
    set_transfer(updatedTransfer);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("showing transfer details ", transfer);
    axios
      .post(API_LINK + "transfer_quantity", { transfer })
      .then((response) => {
        setIsTransferSuccessful(true)
        // setProducts(response.data.products);
        console.log("send data to backend :: ", response.data);
        // console.log(typeof response.data);
        // if (response.data) {
        //   set_warehouse_data(response.data);
        // }
      })
      .catch((err) => console.error(err));
      set_submit(true)
      set_transfer([
        {
          sku: "",
          from_warehouse: "",
          to_warehouse: "",
          quantity: 0,
        },
      ]);
      set_warehouse_index('');
      set_warehouse_index_SKU('');
      setValue(0);
  };

  useEffect(() => {
    fetch_warehouse_product_data();
  }, [warehouse_name_value]);

  useEffect(() => {
    set_submit(false)
    setValue(0)
  
  }, [transfer]);

  return (
    <div>
      <h1>{warehouse_name_value}</h1>
      {Array.isArray(warehouse_all_data) && warehouse_all_data.length > 0 ? (
        <List_ftn_all combinedData={warehouse_all_data} />
      ) : (
        ""
      )}
      <ul>
        {warehouse_all_data.map((item, index) => {
          if (item.warehouse === warehouse_name_value) {
            return (
              <li key={index}>
                SKU: {item.SKU}, Quantity: {item.quantity}
              </li>
            );
          }
          return null; // Return null for non-matching warehouses
        })}
      </ul>

      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Stack spacing={10}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={10}>
              <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
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
                  {
                    warehouse_data.length > 0
                      ? warehouse_data.map((warehouse, index) => {
                          if (warehouse.title !== warehouse_name_value) {
                            return (
                              <MenuItem
                                key={index}
                                value={index}
                                onClick={() => {
                                  handleMenuItemClick(index);
                                  console.log("showing index in loop ", index);
                                }} // Changed to an arrow function
                              >
                                {warehouse.title}
                              </MenuItem>
                            );
                          }
                          return null; // Added to handle cases where the condition is not met
                        })
                      : null /* Changed empty string to null */
                  }
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Choose SKU
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={warehouse_index_SKU}
                  onChange={handleChange_SKU}
                  autoWidth
                  label="Inventory"
                  onClick={fetch_data}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {warehouse_all_data.map((item, index) => {
                    if (item.warehouse === warehouse_name_value) {
                      return (
                        <MenuItem
                          key={index}
                          value={index} // Set the SKU as the value
                          onClick={() => {
                            handleMenuItemClick_SKU(index);
                            console.log("showing SKU in loop ", item.SKU);
                          }}
                        >
                          {item.SKU}
                        </MenuItem>
                      );
                    }
                    return ""; // Return null for non-matching warehouses
                  })}
                </Select>
              </FormControl>
              {/* ------------------------------------------------------------------------------------------------ */}

              <NumberInput
              key={submit_set}
                min={0}
                max={SKU_quantity}
                slots={{
                  root: StyledInputRoot,
                  input: StyledInputElement,
                  incrementButton: StyledButton,
                  decrementButton: StyledButton,
                }}
                slotProps={{
                  incrementButton: {
                    children: "▴",
                  },
                  decrementButton: {
                    children: "▾",
                  },
                }}
                aria-label="Demo number input"
                placeholder="State the quantity"
                value={value}
                onChange={(event, val) => {
                  setValue(val);
                  console.log("showing val", val);
                  handle_quantity(val);
                }}
              />
            </Stack>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </form>
        </Stack>
        {/* ------------------------------------------------------------------------------------------------ */}
      </Container>
    </div>
  );
}

export default Transfer_Stock;
