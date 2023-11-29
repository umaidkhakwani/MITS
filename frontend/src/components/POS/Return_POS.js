import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  List,
  ListItem,
  Modal,
  Paper,
  Popper,
  Radio,
  RadioGroup,
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

const pdfstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "#e6e6ff", // Light purple background color
  border: "2px solid #000",
  borderRadius: "10px",
  p: 4,
};

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

function Return_pos(props) {
  const { combinedData } = props;
  const { warehouse_name } = props;

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

  const [inputValue, setInputValue] = useState("");
  const [gstValues, setGstValues] = useState([]);
  const [discount_Values, set_discount_Values] = useState([]);
  const [quantityValues, set_quantityValues] = useState([]);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [selectedStores, setSelectedStores] = useState(["Cash"]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //---------------------------------------------------------------------------------------------
  const [customer_input, setcustomer_input] = useState([
    {
      // company: "",
      email: "",
      name: "",
      customer_email: "",
      phone_number: "",
    },
  ]);

  //--------------------------  DIALOG CODE ----------------------------------------------------------

  const [openDialog, setOpenDialog] = useState(false);
  // const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    // setSelectedValue(value);
  };

  //------------------------------------------------------------------------------------

  const company2 = useSelector((state) => state.users);

  var current_email = "";
  if (user) {
    current_email = user.email;
  }
  var company_data = "";
  // var user_company = "";
  const user_company = company2.find((obj) => obj.email === current_email);
  if (user_company) {
    company_data = user_company.company;
    console.log(
      "showing user company in list pos 222333 user_company",
      user_company
    );
    console.log(
      "showing user company in list pos 222333 user_company 2",
      user_company.company
    );
    console.log("showing user company in list pos 222333 company 2", company2);
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setAnchorEl(event.currentTarget); // Open the Popper when typing
  };

  const filterRows = (row) => {
    if (!searchQuery) {
      return true;
    }

    const values = Object.values(row);
    for (const value of values) {
      if (value && value.toString().toLowerCase().includes(searchQuery)) {
        return true;
      }
    }
    return false;
  };

  const handlePopperClose = () => {
    setAnchorEl(null); // Close the Popper
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handlePopperClose();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

  const handle_input = (field, value) => {
    setcustomer_input((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    if (customer_input)
      console.log("showing created customer_input", customer_input);
  };

  const handle_customer_upload = async () => {
    if (customer_input.name != "") {
      try {
        console.log("Current user's email:", current_email);
      } catch (error) {
        console.error("Error handling warehouse creation:", error);
      }
      const currentDate = new Date();

      const utcTimestamp = convertToUTC(currentDate);
      // Format date in 'YYYY-MM-DD' format
      let formattedDate = utcTimestamp.split("T")[0];
      // formattedDate = currentDate
      let formattedTime = utcTimestamp.split("T")[1].split(".")[0];

      console.log(
        `showing origional ${utcTimestamp}, formatted date and time ${formattedDate}, ${formattedTime}`
      );
      const requestData = {
        name: customer_input.name || "",
        email: current_email,
        cus_email: customer_input.customer_email || "",
        company: company_data,
        phone: customer_input.phone_number || "",
        date: formattedDate,
        time: formattedTime,
      };
      await axios
        .post(API_LINK + "create_pos_customers", requestData)
        .then((response) => {
          console.log(
            "response.data from create_pos_customers:: ",
            response.data
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    console.log("Updated customer_input:", customer_input);
  }, [customer_input]);

  const handleStoreChange = (store) => {
    setSelectedStores(store);
  };

  useEffect(() => {
    if (!pdfVisible) {
      setcustomer_input([
        {
          // company: "",
          email: "",
          name: "",
          customer_email: "",
          phone_number: "",
        },
      ]);
      setitemSave([]);
      setTotalCostPrice(0);
      setSelectedRows([]);
      setInputValue("");
      setGstValues([]);
      set_discount_Values([]);
      set_quantityValues([]);
    }
  }, [warehouse_name, pdfVisible]);

  const handle_get_warehouse_id = async () => {
    if (user) {
      current_email = user.email;

      let description = "";
      let gst = "";
      let discount_text = "";

      for (let i = 0; i < itemSave.length; i++) {
        description += itemSave[i].barcode + "(" + quantityValues[i] + "),";
      }
      for (let i = 0; i < itemSave.length; i++) {
        gst += itemSave[i].barcode + "(" + gstValues[i] + "),";
      }

      for (let i = 0; i < itemSave.length; i++) {
        discount_text += itemSave[i].barcode + "(" + discount_Values[i] + "),";
      }
      console.log("showing description", description);
      console.log("showing gst", gst);

      const currentDate = new Date();

      const utcTimestamp = convertToUTC(currentDate);
      // Format date in 'YYYY-MM-DD' format
      let formattedDate = utcTimestamp.split("T")[0];
      // formattedDate = currentDate
      let formattedTime = utcTimestamp.split("T")[1].split(".")[0];

      console.log(
        `showing origional ${utcTimestamp}, formatted date and time ${formattedDate}, ${formattedTime}`
      );

      //---------------------------------------------------------------------------------

      const requestData = {
        email: current_email,
        title: warehouse_name,
        description: description,
        gst: gst,
        discount: discount_text,
        cost_price: total_retail,
        total_amount: totalSum,
        user_paid: inputValue,
        discount_price: total_discount,
        transaction: selectedStores,
        time: formattedTime,
        date: formattedDate,
      };

      const requestData2 = {
        email: current_email,
        warehouse: warehouse_name,
        totalCostPrice: total_cost_price,
        totalDiscount: total_discount,
        totalRetail: total_retail,
        time: formattedTime,
        date: formattedDate,
      };

      console.log("in handle_get_warehouse_id", requestData);

      await axios
        .post(API_LINK + "get_warehouse_id", requestData)
        .then((response) => {
          console.log("Successfully inserted POS Closing ");

          axios
            .post(API_LINK + "insert_status", requestData2)
            .then((response2) => {
              console.log("Successfully inserted status ");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  };

  const handlePrintInvoice = async () => {
    handle_get_warehouse_id();
    handle_customer_upload();

    console.log("current_email", current_email);

    if (total_retail > 10) {
      console.log("showing first warehouse_name", warehouse_name);
      console.log("showing first total_retail", total_retail);
      console.log("showing first totalSum", totalSum);
      for (let i = 0; i < itemSave.length; i++) {
        console.log("showing first itemSave", itemSave[i].SKU);
        console.log("showing first gstValues", gstValues[i]);
        console.log("showing first quantityValues", quantityValues[i]);
        console.log("showing company2 in list_ftn_pos ", company2);

        console.log("showing 23233 first user_company", company_data);
        const requestData = {
          company: company_data,
          warehouse_name: warehouse_name,
          SKU: itemSave[i].SKU,
          quantity: quantityValues[i],
        };

        setPdfVisible(true);

        axios
          .post(API_LINK + "pos_stock_updation", requestData)
          .then((response) => {
            console.log("showing product details:: ", response.data[0]);
          })
          .catch((err) => console.error(err));
      }
    }
  };

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

  const handleChange = (event) => {
    setInputValue(event.target.value);
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
      totalCostPrice - parseFloat(deletedItem.retail_price);
    const newItemSave = itemSave.filter((item, i) => i !== index);
    setTotalCostPrice(newTotalCostPrice);
  };

  const updateGstValue = (index, value) => {
    console.log("GST value", value);
    console.log("GST index", index);
    const newGstValues = [...gstValues];
    newGstValues[index] = value;
    console.log(" newGstValues", newGstValues);

    setGstValues(newGstValues);
  };

  const updateDiscountValue = (index, value) => {
    console.log("discount value", value);
    console.log("discount index", index);
    const newDiscountValues = [...discount_Values];
    newDiscountValues[index] = value;
    console.log(" newDiscountValues", newDiscountValues);

    set_discount_Values(newDiscountValues);
  };

  const update_quantityValue = (index, value) => {
    console.log("quantity value", value);
    console.log("quantity index", index);
    const newquantityValues = [...quantityValues];
    newquantityValues[index] = value;
    console.log(" newquantityValues", newquantityValues);

    set_quantityValues(newquantityValues);
  };

  const handleRowClick = async (item) => {
    console.log("sahfba", item); // Log the values in the row

    const selectedItem = {
      SKU: item.SKU || "",
      barcode: item.barcode || "",
      title: item.title || "",
      retail_price: item.retail_price || "",
      cost_price: item.cost_price || "",
    };
    console.log("item.retail_price", item.retail_price);
    console.log("totalCostPrice", totalCostPrice);

    const newTotalCostPrice = totalCostPrice + parseFloat(item.retail_price);

    const newItemSave = [...itemSave, selectedItem];

    console.log("newItemSave", newItemSave);
    console.log("newTotalCostPrice", newTotalCostPrice);

    setitemSave(newItemSave);
    setTotalCostPrice(newTotalCostPrice);

    setchangeList(item);
    setSelectedRows("");
    console.log("combinedData showing", combinedData);
    setSearchQuery("");
    handlePopperClose(); 
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true); // Open the dialog
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
    console.log("Edited Email:", user_email);
    console.log("Edited Password:", password);
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

  useEffect(() => {
    const initialGstValues = itemSave.map(() => ""); // Initialize with empty strings
    setGstValues(initialGstValues);
    set_discount_Values(initialGstValues);
  }, [itemSave]);

  useEffect(() => {
    const initial_quantityValues = itemSave.map(() => ""); // Initialize with empty strings
    set_quantityValues(initial_quantityValues);
  }, [itemSave]);

  const totalSum = itemSave
    .filter(filterRows)
    .map((item, index) => {
      const gstValue = parseFloat(gstValues[index]) || 0;
      const discount_Value = parseFloat(discount_Values[index]) || 0;
      const quantityValue = parseFloat(quantityValues[index]) || 0;
      const retailPrice = parseFloat(item.retail_price) || 0;
      return quantityValue * (retailPrice + retailPrice * (gstValue / 100)); // without Discount, totalSum
    })
    .reduce((acc, value) => acc + value, 0);

  const total_retail = itemSave
    .filter(filterRows)
    .map((item, index) => {
      const retail = parseFloat(item.retail_price) || 0;

      const gstValue = parseFloat(gstValues[index]) || 0;
      const retailPrice = parseFloat(item.retail_price) || 0;

      const quantityValue = parseFloat(quantityValues[index]) || 0;
      return retail * quantityValue;
    })
    .reduce((acc, value) => acc + value, 0);

  const total_discount = itemSave
    .filter(filterRows)
    .map((item, index) => {
      const retail = parseFloat(item.retail_price) || 0;
      const discount_Value = parseFloat(discount_Values[index]) || 0;
      const gstValue = parseFloat(gstValues[index]) || 0;
      const retailPrice = parseFloat(item.retail_price) || 0;

      const quantityValue = parseFloat(quantityValues[index]) || 0;
      return parseInt(quantityValue * (retailPrice * (discount_Value / 100)));
    })
    .reduce((acc, value) => acc + value, 0);

  const total_cost_price = itemSave
    .filter(filterRows)
    .map((item, index) => {
      console.log("item in total_cost_price", item);
      const costPrice = parseFloat(item.cost_price) || 0;
      const quantityValue = parseFloat(quantityValues[index]) || 0;
      return quantityValue * costPrice;
    })
    .reduce((acc, value) => acc + value, 0);

  const total_paid = totalSum - total_discount;

  return (
    <div>
      <Grid item lg={6} sx={{ width: "100%" }}>
        <ul>
          <Stack
            direction="row"
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              id="standard-basic-1"
              label="Customer Name"
              variant="outlined"
              value={customer_input.name}
              onChange={(e) => {
                handle_input("name", e.target.value);
                // isFormValid();
              }}
              required
              sx={{ width: "100%" }}
            />
            <TextField
              id="standard-basic-1"
              label="Customer Email"
              variant="outlined"
              value={customer_input.customer_email}
              onChange={(e) => {
                handle_input("customer_email", e.target.value);
                // isFormValid();
              }}
              required
              sx={{ width: "100%" }}
            />
            <TextField
              id="standard-basic-1"
              label="Phone number"
              variant="outlined"
              value={customer_input.phone_number}
              onChange={(e) => {
                handle_input("phone_number", e.target.value);
                // isFormValid();
              }}
              required
              sx={{ width: "100%" }}
            />
          </Stack>
        </ul>
      </Grid>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
      <Container sx={{ marginTop: "10px" }}>
        <Grid container direction="row">
          <Grid item lg={12}>
            {/* Search bar */}
            <Input
              type="text"
              style={{
                width: "400px",
                margin: "20px 0px",
                padding: "5px",
                color: "black",
                border: "1px solid #593993",
                borderRadius: "10px",
              }}
              placeholder="Search..."
              value={searchQuery}
              onClick={() => setAnchorEl(document.activeElement)} // Open the Popper on click
              onChange={handleSearch}
            />
            <Popper
              open={
                Boolean(anchorEl) && combinedData.filter(filterRows).length > 0
              }
              anchorEl={anchorEl}
              placement="bottom-start"
            >
              <List
                style={{
                  background: "white",
                  border: "1px solid #593993",
                  padding: "0",
                  borderRadius: "5px",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {combinedData.filter(filterRows).map((item, index) => (
                  <ListItem
                    key={index}
                    style={{
                      borderBottom: "1px solid #593993",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick(item)}
                  >
                    {Object.values(item).map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {value}
                      </div>
                    ))}
                  </ListItem>
                ))}
              </List>
            </Popper>
          </Grid>
        </Grid>
      </Container>

      <div
        style={{ maxHeight: "200px", overflowY: "scroll", marginTop: "20px" }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            border: "0px solid #593993",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: "30px",
                  height: "40px",
                  backgroundColor: "#593993",
                  marginTop: "5px",
                }}
              ></th>
              {itemSave.length > 0 ? (
                <>
                  {Object.keys(itemSave[0]).map((key) => (
                    <th
                      key={key}
                      style={{
                        color: "#fff",
                        height: "40px",
                        backgroundColor: "#593993",
                        marginTop: "5px",
                      }}
                    >
                      {key}
                    </th>
                  ))}
                  <th
                    style={{
                      color: "#fff",
                      height: "40px",
                      backgroundColor: "#593993",
                      marginTop: "5px",
                    }}
                  >
                    GST
                  </th>
                  <th
                    style={{
                      color: "#fff",
                      height: "40px",
                      backgroundColor: "#593993",
                      marginTop: "5px",
                    }}
                  >
                    discount
                  </th>
                  <th
                    style={{
                      color: "#fff",
                      height: "40px",
                      backgroundColor: "#593993",
                      marginTop: "5px",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      color: "#fff",
                      height: "40px",
                      backgroundColor: "#593993",
                      marginTop: "5px",
                    }}
                  >
                    Price
                  </th>
                </>
              ) : (
                <th
                  style={{
                    height: "40px",
                    backgroundColor: "#593993",
                    marginTop: "5px",
                  }}
                >
                  No items selected
                </th>
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
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        border: "1px solid #593993",
                      }}
                    >
                      {value}
                    </td>
                  ))}
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <input
                      type="text"
                      value={gstValues[index]}
                      onChange={(e) => updateGstValue(index, e.target.value)}
                      placeholder="GST"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <input
                      type="text"
                      value={discount_Values[index]}
                      onChange={(e) =>
                        updateDiscountValue(index, e.target.value)
                      }
                      placeholder="discount"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <input
                      type="text"
                      value={quantityValues[index]}
                      onChange={(e) =>
                        update_quantityValue(index, e.target.value)
                      }
                      placeholder="Quantity"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {parseFloat(quantityValues[index]) *
                      (parseFloat(item.retail_price) +
                        parseFloat(item.retail_price) *
                          (parseFloat(gstValues[index]) / 100)) || 0}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Container
        sx={{
          height: "50px",
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
            Total GST
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {totalSum - total_retail}
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
            {/* {totalCostPrice} */}
            {total_retail}
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
            {/* {totalCostPrice + totalCostPrice * 0.16} */}
            {totalSum}
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
            Total Discount
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {/* {totalCostPrice} */}
            {total_discount}
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
            Total Payable
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center" }}>
            {total_paid}
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            color: "#593993",
            borderColor: "#593993",
            marginBottom: "30px",
          }}
        >
          Checkout
        </Button>
        <div style={{ marginLeft: "10px" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Cash"
                control={<Radio />}
                label="Cash"
                onChange={() => handleStoreChange("Cash")}
              />
              <FormControlLabel
                value="Card"
                control={<Radio />}
                label="Card"
                onChange={() => handleStoreChange("Card")}
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* <Modal
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
              Total Amount: {total_paid}
            </Typography>

            <TextField
              label="Total Cost Price"
              variant="outlined"
              fullWidth
              value={`${total_paid - inputValue}`}
              disabled
              sx={{ mt: 2 }}
            />
            <TextField
              label="Enter Amount"
              variant="outlined"
              fullWidth
              value={inputValue}
              sx={{ mt: 2 }}
              onChange={handleChange}
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
                  onClick={handlePrintInvoice}
                >
                  Print Invoice
                </Button>
                <Modal open={pdfVisible} onClose={() => setPdfVisible(false)}>
                  <Box sx={pdfstyle}>
                    <InvoicePDF
                      items={itemSave}
                      total_retail={total_retail}
                      discount_Values={discount_Values}
                      gstValues={gstValues}
                      quantityValues={quantityValues}
                      totalSum={totalSum}
                      inputValue={inputValue}
                      total_discount={total_discount}
                      total_paid={total_paid}
                    />
                  </Box>
                </Modal>
              </Grid>
            </Grid>
          </Box>
        </Modal> */}
      </Box>
      </Modal>
    </div>
  );
}

export default Return_pos;


