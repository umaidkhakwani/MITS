import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import firebase_app from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import convertToUTC from "../UTC_converter";

const auth = getAuth(firebase_app);

var API_LINK = "127.0.0.1:5000/";
const user = auth.currentUser;

var current_email = "";
if (user) {
  current_email = user.email;
  console.log("current_email in return dummy", current_email);
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  overflow: "scroll",
  bgcolor: "#e6e6ff", // Light purple background color
  border: "2px solid #000",
  borderRadius: "10px",
  p: 4,
  // opacity: 0.95, // Opacity
};

function Return_dummy(props) {
  const { combinedData } = props;
  const { warehouse_name } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPriceSum, setTotalPriceSum] = useState(0);
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState("");
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);

  const handleprop = () => {
    setOpen(props.modal_open);
  };

  const clearFields = () => {
    setDiscount("");
    setGst("");
    setQuantity("");
    setSelectedItems([]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.callback();
    clearFields();
    setOpen(false);
  };
  const handleSelect = (event, values) => {
    setSelectedItems(values);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(updatedItems);
  };

  const handleLogItems = async () => {
    selectedItems.forEach(async (item) => {
      const currentDate = new Date();
      const utcTimestamp = convertToUTC(currentDate);
      // Format date in 'YYYY-MM-DD' format
      let formattedDate = utcTimestamp.split("T")[0];
      let formattedTime = utcTimestamp.split("T")[1].split(".")[0];
  
      const requestData = {
        email: current_email,
        SKU: item.SKU,
        barcode: item.barcode,
        title: item.title,
        warehouse: warehouse_name,
        retail_price: item.retailPrice || 0,
        quantity: item.quantity,
        discount_per: item.discount,
        tax_per: item.gst,
        date: formattedDate,
        time: formattedTime,
      };
  
      try {
        const response =  axios.post(
          API_LINK + "create_return",
          requestData
        );
        console.log("Response from create_return:", response.data); 
      } catch (error) {
        console.error("Error in create_return:", error);
      }
  
      console.log(`
        Email: ${current_email}
        Title: ${item.title}
        Discount: ${item.discount}
        GST: ${item.gst}
        SKU: ${item.SKU}
        Barcode: ${item.barcode}
        Quantity: ${item.quantity}
        Date: ${formattedDate}
        Time: ${formattedTime}
        Warehouse Name: ${warehouse_name}
        Total Price: ${item.totalPrice || 0}
      `);
    });
  };

  const handleItemChange = (item, property, value) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem === item
    );
    const updatedItem = { ...selectedItems[index] };

    console.log("updatedItem", updatedItem);

    if (property === "quantity") {
      updatedItem.quantity = value;
      console.log("item in return pos", item);
      updatedItem.retailPrice = item.retail_price * value;
      updatedItem.totalPrice =
        item.retail_price * value -
        item.retail_price * value * (item.discount / 100) -
        item.retail_price * value * (item.gst / 100);
    } else {
      updatedItem[property] = value;
    }

    const updatedItems = [...selectedItems];
    updatedItems[index] = updatedItem;

    setSelectedItems(updatedItems);
  };

  useEffect(() => {
    console.log("props showing", props.modal_open);
    handleprop();
    console.log("combinedData in return dummy", combinedData);
    console.log("warehouse_name in return dummy", warehouse_name);
  }, []);

  useEffect(() => {
    console.log("selectedItems:", selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    // Calculate the sum of total prices when selectedItems change
    const sum = selectedItems.reduce(
      (accumulator, selectedItem) =>
        accumulator + (selectedItem.totalPrice || 0),
      0
    );
    setTotalPriceSum(sum);
  }, [selectedItems]);

  const customRenderInput = (params) => (
    <TextField
      {...params}
      variant="standard"
      label="Multiple values"
      placeholder="Favorites"
    />
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} direction="column">
          <Autocomplete
            multiple
            id="tags-standard"
            options={combinedData}
            getOptionLabel={(option) =>
              `- ${option.quantity} :: ${option.title} || ${option.barcode}`
            }
            value={selectedItems}
            onChange={handleSelect}
            renderInput={customRenderInput}
          />
          {selectedItems.map((selectedItem) => (
            <Box key={selectedItem.barcode} mt={2}>
              <Typography variant="subtitle1">Selected Item:</Typography>
              <Stack direction="row" spacing={2}>
                <Typography>
                  Title: {selectedItem.title}, Barcode: {selectedItem.barcode}
                </Typography>
                <TextField
                  sx={{ width: "100px" }}
                  type="number"
                  label="Discount"
                  value={selectedItem.discount || ""}
                  onChange={(e) =>
                    handleItemChange(selectedItem, "discount", e.target.value)
                  }
                />
                <TextField
                  sx={{ width: "100px" }}
                  type="number"
                  label="GST"
                  value={selectedItem.gst || ""}
                  onChange={(e) =>
                    handleItemChange(selectedItem, "gst", e.target.value)
                  }
                />
                <TextField
                  sx={{ width: "100px" }}
                  type="number"
                  label="Quantity"
                  value={selectedItem.quantity || ""}
                  onChange={(e) =>
                    handleItemChange(selectedItem, "quantity", e.target.value)
                  }
                />
                <Typography>
                  Total Price: {selectedItem.totalPrice || 0}
                </Typography>
              </Stack>
              <Button onClick={() => handleRemoveItem(selectedItem)}>
                Remove Item
              </Button>
            </Box>
          ))}
          <Stack
            direction="column"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {/* Display the sum of totalPrice */}
            <TextField
              sx={{ marginTop: 2, width: "200px" }}
              label="Total Price Sum"
              value={totalPriceSum}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button onClick={handleLogItems} sx={{ marginTop: 2 }}>
              Return
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default Return_dummy;
