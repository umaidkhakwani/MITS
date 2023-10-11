import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Warehouse_list from "../components/warehouse/Warehouse_list";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditDialog from "./Verify";
import firebase_app from "../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Update_warehouse_info from "../components/warehouse/Update_warehouse_info";
import CSVFileUploader from "./Import_csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e6e6ff", // Light purple background color
  border: "2px solid #000",
  borderRadius: "10px",
  p: 4,
  // opacity: 0.95, // Opacity
};

const keypadStyle = {
  //   bgcolor: "#330033", // Dark purple background color
  bgcolor: "#593993",
  color: "#fff", // White text color
  textAlign: "center",
  marginTop: "10px",
};

const buttonStyle = {
  color: "#fff", // White text color
};

function List_ftn_pos(props) {
  const { combinedData } = props;
  const { data_warehouse } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [product_details, setproduct_details] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [changeList, setchangeList] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [edit_fields, setedit_fields] = useState(false); // State for dialog visibility
  const [showUploader, setShowUploader] = useState(false);
  const [itemSave, setitemSave] = useState([]);
  const [totalCostPrice, setTotalCostPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputValue, setInputValue] = useState("");

  const company2 = useSelector((state) => state.users);
  // console.log("showing company2 in list_ftn_pos", company2);

  // const [editedEmail, setEditedEmail] = useState(""); // State to store edited email
  // const [editedPassword, setEditedPassword] = useState(""); // State to store edited password

  //   const fetchProductDetails = async () => {
  //     console.log("into fetchProductDetails");
  //     await axios
  //       .get(API_LINK + "get_all_products_detail")
  //       .then((response) => {
  //         console.log("showing product details:: ", response.data[0]);
  //         setproduct_details(response.data[0]);
  //         // console.log(typeof response.data);
  //         //   setWarehouseDetail(response.data);
  //         const final = response.data[0].map((filtered) => {
  //           if (filteredData) {
  //             const productDetail = filteredData.find(
  //               (detail) => detail.SKU === filtered.SKU
  //             );
  //           }
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   };

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    console.log("showing seletcted rows ", selectedRows.length);
  };

  const handleKeypadClick = (value) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const handleRemove = () => {
    setInputValue(""); // Reset the input value
  };

  const handleDelete = (index) => {
    const updatedItemSave = [...itemSave];
    updatedItemSave.splice(index, 1); // Remove the item at the specified index
    setitemSave(updatedItemSave);

    const deletedItem = itemSave[index];
    const newTotalCostPrice =
      totalCostPrice - parseFloat(deletedItem.cost_price);

    // Create a copy of the itemSave array with the item removed
    const newItemSave = itemSave.filter((item, i) => i !== index);

    // Update the state with the new itemSave and total cost price
    setTotalCostPrice(newTotalCostPrice);
  };

  const handle_invoice = () => {
    // itemSave
    // TotalCostPrice

    const resultArray = [];

    // Create a map to store unique objects and their counts
    const uniqueObjectsMap = new Map();

    for (const obj of itemSave) {
      const key = JSON.stringify(obj);

      if (uniqueObjectsMap.has(key)) {
        // Increment the count and update the price for existing objects
        const existingObject = uniqueObjectsMap.get(key);
        existingObject.count++;
        existingObject.cost_price += parseFloat(obj.cost_price); // Convert price to float and add it
      } else {
        // Add a new unique object to the map
        const newObj = {
          ...obj,
          count: 1,
          cost_price: parseFloat(obj.cost_price),
        }; // Convert price to float
        uniqueObjectsMap.set(key, newObj);
      }
    }

    // Convert the map values back to an array of objects
    resultArray.push(...uniqueObjectsMap.values());

    // Calculate the total count
    const totalCount = resultArray.reduce((total, obj) => total + obj.count, 0);

    console.log(resultArray);
    console.log("Total Count:", totalCount);
  };

  const handleRowClick = async (item) => {
    // fetchProductDetails();
    console.log("sahfba", item); // Log the values in the row

    const selectedItem = {
      SKU: item.SKU || "",
      barcode: item.barcode || "",
      title: item.title || "",
      cost_price: item.cost_price || "",
      quantity: 1, // Initialize quantity as 0, you can change it based on user input
    };
    const newTotalCostPrice = totalCostPrice + parseFloat(item.cost_price);

    // Create a copy of the itemSave array and add the new item
    const newItemSave = [...itemSave, selectedItem];

    console.log("newItemSave", newItemSave);
    console.log("newTotalCostPrice", newTotalCostPrice);

    // Update the state with the new array
    setitemSave(newItemSave);
    setTotalCostPrice(newTotalCostPrice);
    // const newItemSave = [...itemSave, item];
    // // Update the state with the new array
    // setitemSave(newItemSave);

    // console.log("showing itemSave", itemSave);

    setchangeList(item);
    setSelectedRows("");
    console.log("combinedData showing", combinedData);
    // Filter the data based on the clicked item's title
    // const filtered = data_warehouse.filter(
    //   (dataItem) => dataItem.title === item.title
    // );
    // console.log("filtered ", filtered);

    // // Get titles corresponding to the SKUs from product details
    // const filteredTitles = filtered.map((filteredItem) => {
    //   console.log("filteredItem", filteredItem.SKU);
    //   const productDetail = product_details.find(
    //     (detail) => detail.SKU === filteredItem.SKU
    //   );
    //   console.log("product detail ----- ", productDetail.title);
    //   return productDetail ? productDetail.title : "N/A";
    // });

    // // Combine the title with the remaining details of the filtered items
    // const combinedFilteredData = filtered.map((filteredItem, index) => ({
    //   ...filteredItem,
    //   title: filteredTitles[index],
    // }));

    // console.log("showing filtered data", combinedFilteredData);
    // setFilteredData(combinedFilteredData);
  };

  const handleSearch = (event) => {
    let val = event.target.value.toString();
    setSearchQuery(val);
  };

  // Search Filtering function

  const filterRows = (row) => {
    if (!searchQuery) {
      return true; // Show all rows if no search query is provided
    }

    const values = Object.values(row);
    for (const value of values) {
      if (value && value.toString().toLowerCase().includes(searchQuery)) {
        return true; // Show the row if any value contains the search query
      }
    }
    return false; // Hide the row if no value contains the search query
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDialogDelete = async (user_email, password) => {
    // Save the edited email and password
    // console.log("Edited Email:", user_email);
    // console.log("Edited Password:", password);
    // // You can perform further actions here with the edited values
    // handleDialogClose(); // Close the dialog
    // const user = auth.currentUser;
    // var current_email = "";
    // if (user) {
    //   current_email = user.email;
    //   console.log("showing currect_email", current_email);
    //   if (current_email == user_email) {
    //     console.log("yayyy");
    //     try {
    //       await signInWithEmailAndPassword(auth, user_email, password);
    //       console.log("User logged in successfully!");
    //       alert("User Verified");
    //       setedit_fields(true);
    //     } catch (error) {
    //       console.error(error.message);
    //       alert("Incorrect email/password");
    //     }
    //   } else {
    //     alert("Incorrect email");
    //   }
    // }
  };

  const handleEditClick = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handle_edit_fields = (value) => {
    console.log("showing value", value);
    setedit_fields(value); // Close the dialog
  };

  const handleDialogSave = async (user_email, password) => {
    // Save the edited email and password
    console.log("Edited Email:", user_email);
    console.log("Edited Password:", password);
    // You can perform further actions here with the edited values
    handleDialogClose(); // Close the dialog

    const user = auth.currentUser;
    var current_email = "";
    if (user) {
      current_email = user.email;
      console.log("showing currect_email", current_email);
      if (current_email == user_email) {
        console.log("yayyy");
        try {
          await signInWithEmailAndPassword(auth, user_email, password);
          console.log("User logged in successfully!");
          alert("User Verified");
          setedit_fields(true);
        } catch (error) {
          console.error(error.message);
          alert("Incorrect email/password");
        }
      } else {
        alert("Incorrect email");
      }
    }
  };

  // ------------------------ IMPORT -----------------------------------------------

  const handle_import = () => {
    setShowUploader(true);
  };

  // -------------------------------------------------------------------------------

  useEffect(() => {
    // fetchProductDetails();
  }, []);

  return (
    <div>
      <div>
        {/* {edit_fields ? (
            <Update_warehouse_info
              row={combinedData[selectedRows[0]]}
              onsubmitting={handle_edit_fields}
            />
          ) : (
            ""
          )} */}
        <Grid container direction="row">
          <Grid item lg={12}></Grid>
        </Grid>
      </div>
      <div>
        <Grid container direction="row">
          <Grid item lg={12}>
            {/*  Search bar */}
            <Input
              type="text"
              style={{
                width: "400px",
                padding: "5px",
                color: "black",
                border: "1px solid #593993",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch} //  Bind search input to state
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        <EditDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          onEdit={handleDialogSave} // Pass the handleDialogSave function
        />
        <table
          style={{
            borderCollapse: "collapse",
            border: "0px solid #593993",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "30px" }}></th>
              {combinedData.length > 0 ? (
                Object.keys(combinedData[0]).map((key) => (
                  <th key={key} style={{ color: "#593993" }}>
                    {key}
                  </th>
                ))
              ) : (
                <th>No items selected</th>
              )}
            </tr>
          </thead>
          <tbody>
            {combinedData
              .filter(filterRows) //  Filter rows based on search query
              .map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #593993",
                    marginBottom: "10px",
                    cursor: "pointer", // Change cursor to pointer
                  }}
                  onClick={() => {
                    handleRowClick(item);
                  }}
                >
                  <td>
                    {/* <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRowSelection(index)}
                      style={{ width: "15px", height: "20px" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop propagation of checkbox click event
                      }}
                    /> */}
                  </td>
                  {Object.values(item).map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Container
        sx={{
          height: "40px",
          backgroundColor: "#593993",
          marginTop: "5px",
          borderRadius: "10px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#fff", textAlign: "center" }}>
          POS #1
        </Typography>
      </Container>

      <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        <EditDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          onEdit={handleDialogSave} // Pass the handleDialogSave function
        />
        <table
          style={{
            borderCollapse: "collapse",
            border: "0px solid #593993",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "30px" }}></th>
              {itemSave.length > 0 ? (
                Object.keys(itemSave[0]).map((key) => (
                  <th key={key} style={{ color: "#593993" }}>
                    {key}
                  </th>
                ))
              ) : (
                <th>No items selected</th>
              )}
            </tr>
          </thead>
          <tbody>
            {itemSave
              .filter(filterRows) // Filter rows based on search query
              .map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #593993",
                    marginBottom: "10px",
                    cursor: "pointer", // Change cursor to pointer
                  }}
                >
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(index)} // Call the onDelete function with the index
                    />
                  </td>
                  {Object.values(item).map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Container
        sx={{
          height: "40px",
          backgroundColor: "#593993",
          marginTop: "5px",
          borderRadius: "10px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flex: 1, // Use flex to distribute space evenly between columns
            display: "flex",
            flexDirection: "column", // Display the content in columns
            alignItems: "center", // Center content horizontally
            marginRight: "10px", // Add margin to create space between columns
          }}
        >
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            GST 16%
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {totalCostPrice * 0.16}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1, // Use flex to distribute space evenly between columns
            display: "flex",
            flexDirection: "column", // Display the content in columns
            alignItems: "center", // Center content horizontally
            marginLeft: "10px", // Add margin to create space between columns
          }}
        >
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            Cost Price
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {totalCostPrice}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1, // Use flex to distribute space evenly between columns
            display: "flex",
            flexDirection: "column", // Display the content in columns
            alignItems: "center", // Center content horizontally
            marginLeft: "10px", // Add margin to create space between columns
          }}
        >
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            Total Cost Price
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {totalCostPrice + totalCostPrice * 0.16}
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{ color: "#593993", borderColor: "#593993" }}
        >
          Checkout
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: "#593993", // Text color
                textAlign: "center", // Center alignment
              }}
            >
              Total Amount: {totalCostPrice + totalCostPrice * 0.16}
            </Typography>

            <TextField
              label="Total Cost Price"
              variant="outlined"
              fullWidth
              value={`${totalCostPrice + totalCostPrice * 0.16 - inputValue}`}
              disabled
              sx={{ mt: 2 }}
            />
            <TextField
              label="Enter Amount"
              variant="outlined"
              fullWidth
              value={inputValue}
              sx={{ mt: 2 }}
            />
            <Paper elevation={3} sx={keypadStyle}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("1")}
                    sx={buttonStyle}
                  >
                    1
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("2")}
                    sx={buttonStyle}
                  >
                    2
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("3")}
                    sx={buttonStyle}
                  >
                    3
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("4")}
                    sx={buttonStyle}
                  >
                    4
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("5")}
                    sx={buttonStyle}
                  >
                    5
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("6")}
                    sx={buttonStyle}
                  >
                    6
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("7")}
                    sx={buttonStyle}
                  >
                    7
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("8")}
                    sx={buttonStyle}
                  >
                    8
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => handleKeypadClick("9")}
                    sx={buttonStyle}
                  >
                    9
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => handleKeypadClick("0")}
                    sx={buttonStyle}
                  >
                    0
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleRemove}
                  sx={{ color: "#ff0000", borderColor: "#ff0000" }}
                >
                  Remove
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(45deg, #593993, #9319B5)",
                    boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                    color: "white",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                  onClick={handle_invoice}
                >
                  Print Invoice
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default List_ftn_pos;
