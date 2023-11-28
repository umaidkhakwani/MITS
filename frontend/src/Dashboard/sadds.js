import React, { useState, useEffect } from 'react';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [newSale, setNewSale] = useState('');
  const localStorageKey = 'salesData';

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedSalesData = JSON.parse(localStorage.getItem(localStorageKey));
    if (savedSalesData) {
      setSalesData(savedSalesData);
    }
  }, []);

  // Function to add a new sale
  const addSale = () => {
    if (newSale) {
      const updatedSalesData = [...salesData, newSale];
      setSalesData(updatedSalesData);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedSalesData));
      setNewSale('');
    }
  };

  return (
    <div>
      <h2>Sales Data</h2>
      <ul>
        {salesData.map((sale, index) => (
          <li key={index}>{sale}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter a new sale"
        value={newSale}
        onChange={(e) => setNewSale(e.target.value)}
      />
      <button onClick={addSale}>Add Sale</button>
    </div>
  );
};

export default Sales;


// import {
//     Box,
//     Button,
//     Container,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     Stack,
//     TextField,
//     Typography,
//   } from "@mui/material";
//   import axios from "axios";
//   import React, { useEffect, useState } from "react";
//   import firebase_app from "../../Firebase/firebase";
//   import { getAuth, onAuthStateChanged } from "firebase/auth";
//   import {
//     Unstable_NumberInput as NumberInput,
//     numberInputClasses,
//   } from "@mui/base/Unstable_NumberInput";
//   import { styled } from "@mui/system";
//   import List_ftn_all from "../../containers/List_ftn_all";
//   import Modal from "@mui/material/Modal";
//   import mits_logo from "../../images/MITS_logo.png";
  
  
//   //----------------------------------------------------------------------------------------------
  
//   const StyledInputRoot = styled("div")(
//     ({ theme }) => `
//         font-family: IBM Plex Sans, sans-serif;
//         font-weight: 400;
//         border-radius: 8px;
//         color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//         background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//         border: 1px solid ${
//           theme.palette.mode === "dark" ? grey[700] : grey[200]
//         };
//         box-shadow: 0px 2px 2px ${
//           theme.palette.mode === "dark" ? grey[900] : grey[50]
//         };
//         display: grid;
//         grid-template-columns: 1fr 19px;
//         grid-template-rows: 1fr 1fr;
//         overflow: hidden;
      
//         &.${numberInputClasses.focused} {
//           border-color: ${blue[400]};
//           box-shadow: 0 0 0 3px ${
//             theme.palette.mode === "dark" ? blue[500] : blue[200]
//           };
//         }
      
//         &:hover {
//           border-color: ${blue[400]};
//         }
      
//         // firefox
//         &:focus-visible {
//           outline: 0;
//         }
//       `
//   );
  
//   const StyledInputElement = styled("input")(
//     ({ theme }) => `
//         font-size: 0.875rem;
//         font-family: inherit;
//         font-weight: 400;
//         line-height: 1.5;
//         grid-column: 1/2;
//         grid-row: 1/3;
//         color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//         background: inherit;
//         border: none;
//         border-radius: inherit;
//         padding: 8px 12px;
//         outline: 0;
//       `
//   );
  
//   const StyledButton = styled("button")(
//     ({ theme }) => `
//         display: flex;
//         flex-flow: row nowrap;
//         justify-content: center;
//         align-items: center;
//         appearance: none;
//         padding: 0;
//         width: 19px;
//         height: 19px;
//         font-family: system-ui, sans-serif;
//         font-size: 0.875rem;
//         box-sizing: border-box;
//         line-height: 1.2;
//         background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//         border: 0;
//         color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      
//         transition-property: all;
//         transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//         transition-duration: 120ms;
      
//         &:hover {
//           background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
//           border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
//           cursor: pointer;
//         }
      
//         &.${numberInputClasses.incrementButton} {
//           grid-column: 2/3;
//           grid-row: 1/2;
//         }
      
//         &.${numberInputClasses.decrementButton} {
//           grid-column: 2/3;
//           grid-row: 2/3;
//         }
//       `
//   );
  
//   const blue = {
//     100: "#DAECFF",
//     200: "#80BFFF",
//     400: "#3399FF",
//     500: "#007FFF",
//     600: "#0072E5",
//   };
  
//   const grey = {
//     50: "#F3F6F9",
//     100: "#E7EBF0",
//     200: "#E0E3E7",
//     300: "#CDD2D7",
//     400: "#B2BAC2",
//     500: "#A0AAB4",
//     600: "#6F7E8C",
//     700: "#3E5060",
//     800: "#2D3843",
//     900: "#1A2027",
//   };
  
//   //-----------------------------------------------------------------------------------------------
  
//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "rgba(169, 169, 169, 0.8)", // Gray with opacity
//     boxShadow: 24,
//     width: 400,
//     p: 4,
//     textAlign: "center",
//   };
  
//   //-----------------------------------------------------------------------------------------------
  
//   const auth = getAuth(firebase_app);
  
//   var API_LINK = "http://191.101.233.66:5000/";
//   var sortedCustomers = "";
  
//   function Transfer_products() {
//     const [warehouse_index, set_warehouse_index] = React.useState("");
//     const [warehouse_index_SKU, set_warehouse_index_SKU] = React.useState("");
//     const [warehouse_data, set_warehouse_data] = React.useState("");
//     const [warehouse_all_data, set_warehouse_all_data] = React.useState([]);
//     const [SKU_quantity, set_SKU_quantity] = React.useState(0);
//     const [value, setValue] = useState(0);
//     const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
//     const [submit_set, set_submit] = useState(false);
//     const [transfer, set_transfer] = useState([
//       {
//         email: "",
//         sku: "",
//         from_warehouse: "",
//         to_warehouse: "",
//         quantity: 0,
//       },
//     ]);
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
  
//     const warehouse_name_value = "warehouse 1";
//     var email_user = "";
//     const user = auth.currentUser;
  
//     //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
  
//     var warehouse_list = "";
//     //   console.log("showing obj1 ", props.obj1);
  
//     const fetch_warehouse_product_data = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           email_user = user.email;
//           // console.log("Current user's email:", email_user);
//           // console.log("Current user's email 2 :", email_user);
//           axios
//             .post(API_LINK + "get_all_warehouse_products", { email: email_user })
//             .then((response) => {
//               // setProducts(response.data.products);
//               console.log("showing all warehouse list :: ", response.data[0]);
//               // console.log(typeof response.data);
//               if (response.data[0]) {
//                 // set_warehouse_all_data(response.data[0]);
  
//                 const emailAndTitleArray = response.data[0].map((row) => ({
//                   id: row.id,
//                   warehouse: row.warehouse || "", // Replace null with ""
//                   SKU: row.SKU || "", // Replace null with ""
//                   quantity: row.quantity || 0,
//                 }));
//                 console.log("showing emailAndTitleArray", emailAndTitleArray);
//                 set_warehouse_all_data(emailAndTitleArray);
//               }
//             })
//             .catch((err) => console.error(err));
//         } else {
//           console.log("No user is currently signed in.");
//         }
//       });
//     };
  
//     const handleMenuItemClick = (index) => () => {
//       handle_check(index); // Call handle_check only when the MenuItem is clicked
//       console.log("showing index ", index);
//     };
  
//     const handleMenuItemClick_SKU = (index) => () => {
//       handle_check_SKU(index); // Call handle_check only when the MenuItem is clicked
//       console.log("showing index ", index);
//     };
  
//     const handle_check = (index) => {
//       set_warehouse_index(index);
//       console.log("showing index", index);
//       console.log("showing warehouse_list", warehouse_list);
//     };
  
//     const handle_check_SKU = (index) => {
//       set_warehouse_index_SKU(index);
//       console.log("showing index", index);
//       console.log("showing warehouse_list", warehouse_list);
//     };
  
//     const fetch_data = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           email_user = user.email;
//           // console.log("Current user's email:", email_user);
//           // console.log("Current user's email 2 :", email_user);
//           axios
//             .post(API_LINK + "get_warehouse", { email: email_user })
//             .then((response) => {
//               // setProducts(response.data.products);
//               // console.log("send data to backend :: ", response.data);
//               // console.log(typeof response.data);
//               if (response.data) {
//                 set_warehouse_data(response.data);
//               }
//             })
//             .catch((err) => console.error(err));
//         } else {
//           console.log("No user is currently signed in.");
//         }
//       });
//     };
  
//     useEffect(() => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           email_user = user.email;
//         }
//       });
//       fetch_data();
//     }, []);
  
//     useEffect(() => {
//       fetch_warehouse_product_data();
//     }, [warehouse_name_value]);
  
//     useEffect(() => {
//       if (isTransferSuccessful) {
//         console.log("yayyy");
//         setIsTransferSuccessful(false);
//         fetch_warehouse_product_data();
//       }
//     }, [warehouse_all_data]);
  
//     const handleChange = (event) => {
//       const selectedValue = event.target.value;
  
//       // Assuming you're using Firebase Auth
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           email_user = user.email;
//           console.log("showing user ", email_user);
//           set_warehouse_index(event.target.value); // Update selected inventory
//           if (event.target.value !== null) {
//             console.log(
//               "showing warehouse_data of menuitem ",
//               warehouse_data[event.target.value]
//             );
//             const selectedItem = warehouse_data[event.target.value];
  
//             // Create a copy of the current transfer state
//             const updatedTransfer = [...transfer];
  
//             // Update the sku field of the selected item in the copy
//             updatedTransfer[0].to_warehouse = selectedItem.title;
//             updatedTransfer[0].from_warehouse = warehouse_name_value;
//             updatedTransfer[0].email = email_user;
  
//             // Set the updated copy as the new transfer state
//             set_transfer(updatedTransfer);
//             console.log("showing SKU in loop ", selectedItem.SKU);
//           }
//         }
//       });
//     };
  
//     const handleChange_SKU = (event) => {
//       // console.log("iam in handle change :: ",event.target.value);
//       set_warehouse_index_SKU(event.target.value); // Update selected inventory
//       if (event.target.value !== null) {
//         console.log(
//           "showing value of menuitem in warehouse all data ",
//           warehouse_all_data[event.target.value]
//         );
//         set_SKU_quantity(warehouse_all_data[event.target.value].quantity);
//         console.log(
//           "showing quantity ",
//           warehouse_all_data[event.target.value].quantity
//         );
  
//         const selectedItem = warehouse_all_data[event.target.value];
  
//         // Create a copy of the current transfer state
//         const updatedTransfer = [...transfer];
  
//         // Update the sku field of the selected item in the copy
//         updatedTransfer[0].sku = selectedItem.SKU;
  
//         // Set the updated copy as the new transfer state
//         set_transfer(updatedTransfer);
  
//         console.log("showing SKU in loop ", selectedItem.SKU);
//       }
//     };
  
//     const handle_quantity = (val) => {
//       // Create a copy of the current transfer state
//       const updatedTransfer = [...transfer];
  
//       // Update the sku field of the selected item in the copy
//       updatedTransfer[0].quantity = val;
  
//       // Set the updated copy as the new transfer state
//       set_transfer(updatedTransfer);
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       console.log("showing transfer details ", transfer);
//       axios
//         .post(API_LINK + "transfer_quantity", { transfer })
//         .then((response) => {
//           setIsTransferSuccessful(true);
//           // setProducts(response.data.products);
//           console.log("send data to backend :: ", response.data);
//           handleOpen();
//           // console.log(typeof response.data);
//           // if (response.data) {
//           //   set_warehouse_data(response.data);
//           // }
//         })
//         .catch((err) => console.error(err));
//       set_submit(true);
//       set_transfer([
//         {
//           sku: "",
//           from_warehouse: "",
//           to_warehouse: "",
//           quantity: 0,
//         },
//       ]);
//       set_warehouse_index("");
//       set_warehouse_index_SKU("");
//       setValue(0);
//     };
  
//     useEffect(() => {
//       fetch_warehouse_product_data();
//     }, [warehouse_name_value]);
  
//     useEffect(() => {
//       set_submit(false);
//       setValue(0);
//     }, [transfer]);
  
//     return (
//       <div>
//         <div style={{ maxHeight: "450px", overflowY: "scroll", margin: "20px" }}>
//           {Array.isArray(warehouse_all_data) && warehouse_all_data.length > 0 ? (
//             <List_ftn_all combinedData={warehouse_all_data} />
//           ) : (
//             ""
//           )}
//         </div>
  
//         <Container
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "100%",
//           }}
//         >
//           <Stack spacing={10}>
//             <form onSubmit={handleSubmit}>
//               <Stack direction="row" spacing={10}>
                  
//                 <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
//                   <InputLabel id="demo-simple-select-autowidth-label">
//                     Choose Warehouse
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-autowidth-label"
//                     id="demo-simple-select-autowidth"
//                     value={warehouse_index}
//                     onChange={handleChange}
//                     autoWidth
//                     label="Inventory"
//                     onClick={fetch_data}
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     {
//                       warehouse_data.length > 0
//                         ? warehouse_data.map((warehouse, index) => {
//                             if (warehouse.title !== warehouse_name_value) {
//                               return (
//                                 <MenuItem
//                                   key={index}
//                                   value={index}
//                                   onClick={() => {
//                                     handleMenuItemClick(index);
//                                     console.log("showing index in loop ", index);
//                                   }} // Changed to an arrow function
//                                 >
//                                   {warehouse.title}
//                                 </MenuItem>
//                               );
//                             }
//                             return null; // Added to handle cases where the condition is not met
//                           })
//                         : null /* Changed empty string to null */
//                     }
//                   </Select>
//                 </FormControl>
//                 <FormControl sx={{ m: 1, minWidth: 250, margin: "50px" }}>
//                   <InputLabel id="demo-simple-select-autowidth-label">
//                     Choose SKU
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-autowidth-label"
//                     id="demo-simple-select-autowidth"
//                     value={warehouse_index_SKU}
//                     onChange={handleChange_SKU}
//                     autoWidth
//                     label="Inventory"
//                     onClick={fetch_data}
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     {warehouse_all_data.map((item, index) => {
//                       if (item.warehouse === warehouse_name_value) {
//                         return (
//                           <MenuItem
//                             key={index}
//                             value={index} // Set the SKU as the value
//                             onClick={() => {
//                               handleMenuItemClick_SKU(index);
//                               console.log("showing SKU in loop ", item.SKU);
//                             }}
//                           >
//                             {item.SKU}
//                           </MenuItem>
//                         );
//                       }
//                       return ""; // Return null for non-matching warehouses
//                     })}
//                   </Select>
//                 </FormControl>
//                 {/* ------------------------------------------------------------------------------------------------ */}
  
//                 <NumberInput
//                   key={submit_set}
//                   min={0}
//                   max={SKU_quantity}
//                   slots={{
//                     root: StyledInputRoot,
//                     input: StyledInputElement,
//                     incrementButton: StyledButton,
//                     decrementButton: StyledButton,
//                   }}
//                   slotProps={{
//                     incrementButton: {
//                       children: "▴",
//                     },
//                     decrementButton: {
//                       children: "▾",
//                     },
//                   }}
//                   aria-label="Demo number input"
//                   placeholder="State the quantity"
//                   value={value}
//                   onChange={(event, val) => {
//                     setValue(val);
//                     console.log("showing val", val);
//                     handle_quantity(val);
//                   }}
//                 />
//               </Stack>
//               {/* <Button variant="contained" type="submit">
//                   Create
//                 </Button> */}
//               <div style={{ display: "flex", justifyContent: "center" }}>
//                 <Button
//                   variant="outlined"
//                   type="submit"
//                   sx={{
//                     color: "#593993",
//                     borderColor: "#593993",
//                     marginTop: "20px", // Adjust the margin-top value as needed
//                   }}
//                 >
//                   Transfer
//                 </Button>
//               </div>
//             </form>
//           </Stack>
//           {/* ------------------------------------------------------------------------------------------------ */}
//         </Container>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={modalStyle}>
//           <img
//                       src={mits_logo} // Replace with the source of your round logo
//                       alt="Round Logo"
//                       style={{
//                         width: "70px",
//                         height: "70px",
//                         borderRadius: "50%",
//                         margin: "10px",
//                       }}
//                     />
//             <Typography
//               id="modal-modal-title"
//               variant="h5"
//               component="h2"
//               sx={{ color: "#593993" }}
//             >
//               Transfer Successful
//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//     );
//   }
  
//   export default Transfer_products;
  



// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Divider,
// //   Drawer,
// //   Grid,
// //   IconButton,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemIcon,
// //   ListItemText,
// // } from "@mui/material";
// // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// // function App() {
// //   const [open, setOpen] = useState(true);
// //   const [selectedItem, setSelectedItem] = useState("Dashboard");
// //   const [openSublist, setOpenSublist] = useState(null);

// //   const handleDrawerToggle = () => {
// //     setOpen(!open);
// //   };

// //   const handlelogoClick = () => {
// //     setSelectedItem("Dashboard");
// //     setOpenSublist(null);
// //   };

// //   const handleItemClick = (item) => {
// //     if (item.sublist) {
// //       setSelectedItem(item.sublist[0].text); // Select the first subitem
// //     } else {
// //       setSelectedItem(item.text); // Select the parent if it has no subitems
// //     }
// //     if (openSublist === item.text) {
// //       setOpenSublist(null);
// //     } else {
// //       setOpenSublist(item.text);
// //     }
// //   };

// //   const handleSubItemClick = (subItemText) => {
// //     setSelectedItem(subItemText);
// //   };

// //   const menuItems = [
// //     { text: "Dashboard", icon: dashboard_icon },
// //     { text: "Warehouse", icon: warehouse_icon },
// //     {
// //       text: "Inventory",
// //       icon: inventory_icon,
// //       sublist: [
// //         { text: "Products", icon: dashboard_icon },
// //         { text: "Transfers", icon: dashboard_icon },
// //       ],
// //     },
// //     { text: "Customers", icon: customers_icon },
// //     {
// //       text: "Suppliers",
// //       icon: supplier_icon,
// //       sublist: [
// //         { text: "View", icon: dashboard_icon },
// //         { text: "Add", icon: dashboard_icon },
// //       ],
// //     },
// //     { text: "POS", icon: pos_icon },
// //     { text: "Analytics", icon: analytics_icon },
// //     { text: "Assign", icon: assign_icon },
// //     { text: "Smart Tools", icon: setting },
// //     { text: "Setting", icon: setting },
// //   ];

// //   return (
// //     <div>
// //       <Drawer
// //         variant="permanent"
// //         anchor="left"
// //         sx={{
// //           width: open ? "250px" : "80px",
// //           flexShrink: 0,
// //           "& .MuiDrawer-paper": {
// //             width: open ? "250px" : "80px",
// //             transition: "width 0.2s ease-in-out",
// //           },
// //         }}
// //       >
// //         <div>
// //           {/* Your logo or header here */}
// //           <List>
// //             {menuItems.map((item, index) => (
// //               <div key={item.text}>
// //                 <ListItem
// //                   disablePadding
// //                   sx={{
// //                     display: "block",
// //                     backgroundColor:
// //                       selectedItem === item.text
// //                         ? "rgba(225, 246, 246, 0.10)"
// //                         : "transparent",
// //                     borderLeft:
// //                       selectedItem === item.text
// //                         ? "5px solid #593993"
// //                         : "none",
// //                   }}
// //                 >
// //                   <ListItemButton
// //                     sx={{
// //                       height: "30px",
// //                       justifyContent: open ? "initial" : "center",
// //                       px: 2.5,
// //                       color:
// //                         selectedItem === item.text ? "#593993" : "#cec7c7",
// //                       fontFamily: "Khula",
// //                       fontSize: "28px",
// //                       fontStyle: "normal",
// //                       fontWeight:
// //                         selectedItem === item.text ? "bold" : 400,
// //                       lineHeight: "normal",
// //                       margin: "10px 0",
// //                     }}
// //                     onClick={() => handleItemClick(item)}
// //                   >
// //                     <ListItemIcon
// //                       sx={{
// //                         minWidth: 0,
// //                         mr: open ? 3 : "auto",
// //                         justifyContent: "center",
// //                       }}
// //                     >
// //                       <img
// //                         src={item.icon}
// //                         alt={item.text}
// //                         style={{
// //                           filter:
// //                             selectedItem === item.text
// //                               ? "brightness(0) invert(1) sepia(100%) saturate(10000%) hue-rotate(234deg) brightness(1.3)"
// //                               : "none",
// //                         }}
// //                       />
// //                     </ListItemIcon>
// //                     <ListItemText
// //                       primary={item.text}
// //                       sx={{
// //                         opacity: open ? 1 : 0,
// //                         fontWeight:
// //                           selectedItem === item.text ? "bold" : "normal",
// //                       }}
// //                     />
// //                     {item.sublist && (
// //                       <IconButton
// //                         sx={{ color: "#cec7c7", marginLeft: "auto" }}
// //                       >
// //                         {openSublist === item.text ? (
// //                           <ExpandLessIcon />
// //                         ) : (
// //                           <ExpandMoreIcon />
// //                         )}
// //                       </IconButton>
// //                     )}
// //                   </ListItemButton>
// //                 </ListItem>
// //                 {item.sublist && openSublist === item.text && (
// //                   <List sx={{ paddingLeft: "25px" }}>
// //                     {item.sublist.map((subItem, subIndex) => (
// //                       <ListItem
// //                         key={subItem.text}
// //                         disablePadding
// //                         sx={{
// //                           display: "block",
// //                           backgroundColor:
// //                             selectedItem === subItem.text
// //                               ? "rgba(225, 246, 246, 0.10)"
// //                               : "transparent",
// //                           borderLeft:
// //                             selectedItem === subItem.text
// //                               ? "5px solid #593993"
// //                               : "none",
// //                         }}
// //                       >
// //                         <ListItemButton
// //                           sx={{
// //                             height: "20px",
// //                             justifyContent: open ? "initial" : "center",
// //                             px: 2.5,
// //                             color:
// //                               selectedItem === subItem.text
// //                                 ? "#593993"
// //                                 : "#cec7c7",
// //                             fontFamily: "Khula",
// //                             fontSize: "28px",
// //                             fontStyle: "normal",
// //                             fontWeight:
// //                               selectedItem === subItem.text ? "bold" : 400,
// //                             lineHeight: "normal",
// //                             margin: "8px 0",
// //                           }}
// //                           onClick={() => handleSubItemClick(subItem.text)}
// //                         >
// //                           <ListItemIcon
// //                             sx={{
// //                               minWidth: 0,
// //                               mr: open ? 3 : "auto",
// //                               justifyContent: "center",
// //                             }}
// //                           >
// //                             {/* Your sub-item icon here */}
// //                           </ListItemIcon>
// //                           <ListItemText
// //                             primary={subItem.text}
// //                             sx={{
// //                               opacity: open ? 1 : 0,
// //                               fontWeight:
// //                                 selectedItem === subItem.text
// //                                   ? "bold"
// //                                   : "normal",
// //                             }}
// //                           />
// //                         </ListItemButton>
// //                       </ListItem>
// //                     ))}
// //                   </List>
// //                 )}
// //               </div>
// //             ))}
// //           </List>
// //           <Divider />
// //         </div>
// //       </Drawer>
// //       <Box
// //         component="main"
// //         sx={{ width: "90%", height: "100%", backgroundColor: "#f2f2f2" }}
// //       >
// //         {/* Your Header_ftn component here */}
// //         <Header_ftn heading={selectedItem} />
// //         {selectedItem === "Dashboard" ? (
// //           // Render your Dashboard component here
// //         ) : selectedItem === "Warehouse" ? (
// //           // Render your Warehouse component here
// //         ) : selectedItem === "Inventory" ? (
// //           // Render your Inventory component here
// //         ) : selectedItem === "Customers" ? (
// //           // Render your Customers component here
// //         ) : selectedItem === "View" ? (
// //           // Render your Suppliers component here
// //         ) : selectedItem === "Add" ? (
// //           // Render your Suppliers_create component here
// //         ) : selectedItem === "POS" ? (
// //           // Render your POS1 component here
// //         ) : selectedItem === "Analytics" ? (
// //           // Render your Analytics component here
// //         ) : selectedItem === "Assign" ? (
// //           // Render your Assign component here
// //         ) : selectedItem === "Smart Tools" ? (
// //           // Render your Smart Tools component here
// //         ) : selectedItem === "Setting" ? (
// //           // Render your Setting component here
// //         ) : (
// //           // Render a default component here if needed
// //         )}
// //       </Box>
// //     </div>
// //   );
// // }

// // export default App;



// // import * as React from 'react';
// // import { styled, useTheme } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import MuiDrawer from '@mui/material/Drawer';
// // import MuiAppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Typography from '@mui/material/Typography';
// // import Divider from '@mui/material/Divider';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';



// // import MITS_logo from "../images/dashboard_Logo_MITS.png";
// // import bg1 from "../images/sidebar.png";
// // import '../css/styles.css'
// // import { Grid } from '@mui/material';

// // const drawerWidth = 240;

// // const openedMixin = (theme) => ({
// //   width: drawerWidth,
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.enteringScreen,
// //   }),
// //   overflowX: 'hidden',
// // });

// // const closedMixin = (theme) => ({
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   overflowX: 'hidden',
// //   width: `calc(${theme.spacing(7)} + 1px)`,
// //   [theme.breakpoints.up('sm')]: {
// //     width: `calc(${theme.spacing(8)} + 1px)`,
// //   },
// // });

// // const DrawerHeader = styled('div')(({ theme }) => ({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'flex-end',
// //   padding: theme.spacing(0, 1),
// //   ...theme.mixins.toolbar,
// // }));

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// //   ({ theme, open }) => ({
// //     width: drawerWidth,
// //     flexShrink: 0,
// //     whiteSpace: 'nowrap',
// //     boxSizing: 'border-box',
// //     ...(open && {
// //       ...openedMixin(theme),
// //       '& .MuiDrawer-paper': openedMixin(theme),
// //     }),
// //     ...(!open && {
// //       ...closedMixin(theme),
// //       '& .MuiDrawer-paper': closedMixin(theme),
// //     }),
// //   }),
// // );

// // const SidebarContainer = styled('div')({
// //   position: 'relative',
// //   backgroundImage: 'url(${bg1})', // Replace with your image path
// //   backgroundRepeat: 'no-repeat',
// //   backgroundSize: 'cover',
// //   backgroundPosition: 'center',
// //   height: '100%',
// //   zIndex: 1000, // Increase the z-index value
// // });

// // const Logo = styled('img')({
// //   position: 'absolute',
// //   top: '16px', // Adjust the top position as needed
// //   left: '16px', // Adjust the left position as needed
// //   width: 'auto', // Adjust the width as needed
// //   height: '40px', // Adjust the height as needed
// //   zIndex: 1001, // Ensure the logo is above other content
// // });

// // export default function Sidebar() {
// //   const theme = useTheme();
// //   const [open, setOpen] = React.useState(false);

// //   const handleDrawerToggle = () => {
// //     setOpen(!open);
// //   };

// //   return (
// //     <div>

    
// // <Drawer variant="permanent" open={open} className="drawer-container">
// //   <Grid container sx={{
// //     height: '100%',
// //     backgroundImage: `url(${bg1})`, // Set your background image URL here
// //     backgroundRepeat: 'no-repeat',
// //     backgroundSize: 'cover',
// //     backgroundPosition: 'center',
// //     position: 'relative',
// //   }}>
// //     {open && (
// //       <Grid item xs={2}>
// //         <Logo src={MITS_logo} alt="Logo" />
// //       </Grid>
// //     )}

// //     <Grid item xs={open ? 10 : 12}>
// //       <DrawerHeader>
// //         <IconButton onClick={handleDrawerToggle}>
// //           {open ? (
// //             theme.direction === 'rtl' ? (
// //               <ChevronRightIcon />
// //             ) : (
// //               <ChevronLeftIcon />
// //             )
// //           ) : (
// //             <ChevronRightIcon />
// //           )}
// //         </IconButton>
// //       </DrawerHeader>
// //       <Divider />
// //       <List>
// //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //           <ListItem key={text} disablePadding sx={{ display: 'block' }}>
// //             <ListItemButton
// //               sx={{
// //                 minHeight: 48,
// //                 justifyContent: open ? 'initial' : 'center',
// //                 px: 2.5,
// //               }}
// //             >
// //               <ListItemIcon
// //                 sx={{
// //                   minWidth: 0,
// //                   mr: open ? 3 : 'auto',
// //                   justifyContent: 'center',
// //                 }}
// //               >
// //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //       <Divider />
// //       <List>
// //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
// //           <ListItem key={text} disablePadding sx={{ display: 'block' }}>
// //             <ListItemButton
// //               sx={{
// //                 minHeight: 48,
// //                 justifyContent: open ? 'initial' : 'center',
// //                 px: 2.5,
// //               }}
// //             >
// //               <ListItemIcon
// //                 sx={{
// //                   minWidth: 0,
// //                   mr: open ? 3 : 'auto',
// //                   justifyContent: 'center',
// //                 }}
// //               >
// //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Grid>
// //   </Grid>
// // </Drawer>


// //       {/* </SidebarContainer> */}
// //     </div>
// //   );
// // }




















// // import * as React from 'react';
// // import { styled, useTheme } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import MuiDrawer from '@mui/material/Drawer';
// // import MuiAppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Typography from '@mui/material/Typography';
// // import Divider from '@mui/material/Divider';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';

// // const drawerWidth = 240;

// // const openedMixin = (theme) => ({
// //   width: drawerWidth,
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.enteringScreen,
// //   }),
// //   overflowX: 'hidden',
// // });

// // const closedMixin = (theme) => ({
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   overflowX: 'hidden',
// //   width: `calc(${theme.spacing(7)} + 1px)`,
// //   [theme.breakpoints.up('sm')]: {
// //     width: `calc(${theme.spacing(8)} + 1px)`,
// //   },
// // });

// // const DrawerHeader = styled('div')(({ theme }) => ({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'flex-end',
// //   padding: theme.spacing(0, 1),
// //   // necessary for content to be below app bar
// //   ...theme.mixins.toolbar,
// // }));

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// //   ({ theme, open }) => ({
// //     width: drawerWidth,
// //     flexShrink: 0,
// //     whiteSpace: 'nowrap',
// //     boxSizing: 'border-box',
// //     ...(open && {
// //       ...openedMixin(theme),
// //       '& .MuiDrawer-paper': openedMixin(theme),
// //     }),
// //     ...(!open && {
// //       ...closedMixin(theme),
// //       '& .MuiDrawer-paper': closedMixin(theme),
// //     }),
// //   }),
// // );

// // export default function Sidebar() {
// //   const theme = useTheme();
// //   const [open, setOpen] = React.useState(false);

// //   const handleDrawerOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleDrawerClose = () => {
// //     setOpen(false);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       <AppBar position="fixed" open={open}>
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open drawer"
// //             onClick={handleDrawerOpen}
// //             edge="start"
// //             sx={{
// //               marginRight: 5,
// //               ...(open && { display: 'none' }),
// //             }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography variant="h6" noWrap component="div">
// //             Mini variant drawer
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>
// //     <Drawer variant="permanent" open={open}>
// //         <DrawerHeader>
// //           <IconButton onClick={handleDrawerClose}>
// //             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
// //           </IconButton>
// //         </DrawerHeader>
// //         <Divider />
// //         <List>
// //           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
// //               <ListItemButton
// //                 sx={{
// //                   minHeight: 48,
// //                   justifyContent: open ? 'initial' : 'center',
// //                   px: 2.5,
// //                 }}
// //               >
// //                 <ListItemIcon
// //                   sx={{
// //                     minWidth: 0,
// //                     mr: open ? 3 : 'auto',
// //                     justifyContent: 'center',
// //                   }}
// //                 >
// //                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //                 </ListItemIcon>
// //                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
// //               </ListItemButton>
// //             </ListItem>
// //           ))}
// //         </List>
// //         <Divider />
// //         <List>
// //           {['All mail', 'Trash', 'Spam'].map((text, index) => (
// //             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
// //               <ListItemButton
// //                 sx={{
// //                   minHeight: 48,
// //                   justifyContent: open ? 'initial' : 'center',
// //                   px: 2.5,
// //                 }}
// //               >
// //                 <ListItemIcon
// //                   sx={{
// //                     minWidth: 0,
// //                     mr: open ? 3 : 'auto',
// //                     justifyContent: 'center',
// //                   }}
// //                 >
// //                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //                 </ListItemIcon>
// //                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
// //               </ListItemButton>
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Drawer>
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <DrawerHeader />
// //         <Typography paragraph>
// //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
// //           tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
// //           enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
// //           imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
// //           Convallis convallis tellus id interdum velit laoreet id donec ultrices.
// //           Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
// //           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
// //           nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
// //           leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
// //           feugiat vivamus at augue. At augue eget arcu dictum varius duis at
// //           consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
// //           sapien faucibus et molestie ac.
// //         </Typography>
// //         <Typography paragraph>
// //           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
// //           eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
// //           neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
// //           tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
// //           sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
// //           tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
// //           gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
// //           et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
// //           tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
// //           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
// //           posuere sollicitudin aliquam ultrices sagittis orci a.
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // }