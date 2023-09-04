






// import { Box, Button, Container, Stack, TextField } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import firebase_app from "../Firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth(firebase_app);

// var API_LINK = "http://localhost:5000/";
// var sortedCustomers = "";

// function Warehouse() {
//   const [warehouse_options, set_warehouse_options] = useState("");
//   const [responseData_customers, setresponseData_customers] = useState(null);
//   const [page_options, set_page_options] = useState("");
//   const [form_validity, set_form_validity] = useState(false);
//   const [warehouse_create, setwarehouse_create] = useState([
//     {
//       email: "",
//       title: "",
//       address: "",
//       city: "",
//       country: "",
//     },
//   ]);

//   const handle_create_warehouse = (field, value) => {
//     // setInventory(event.target.value);
//     // console.log("showing", event.target.value);
//     setwarehouse_create((prevItem) => ({
//       ...prevItem,
//       [field]: value,
//     }));
//     console.log("showing created products", warehouse_create);
//   };

//   const sorting_function = () => {
//     if (responseData_customers) {
//       sortedCustomers = responseData_customers
//         .slice()
//         .sort((a, b) => b.orders_count - a.orders_count);
//     }
//   };

//   const create_warehouse = () => {
//     set_warehouse_options("create_warehouse");
//     // handle_get_cust_data();
//     set_page_options("create_warehouse");
//     console.log("iam in create warehouse");
//   };

//   //   async function handle_get_cust_data() {
//   //     try {
//   //       const response = await axios.get(API_LINK + "create_warehouse");
//   //       console.log("data sent from backend :: ", response.data.customers);
//   //       console.log(typeof response.data);
//   //       setresponseData_customers(response.data.customers);
//   //       sorting_function(); // Move this line to after setting the state
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       // Handle the error
//   //     }
//   //   }
//   const isFormValid = () => {
//     if (
//       warehouse_create.title !== "" &&
//       warehouse_create.address !== "" &&
//       warehouse_create.city !== "" &&
//       warehouse_create.country !== ""
//     ) {
//       set_form_validity(true);
//       console.log("showing form validity", form_validity);
//       console.log(warehouse_create);
//     } else {
//       set_form_validity(false);
//       console.log("showing form validity", form_validity);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (form_validity) {
//       console.log(isFormValid());
//       const requestData = {
//         product: warehouse_create,
//       };
//       console.log("into handle submit", requestData);
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const email = user.email;
//           handle_create_warehouse("email", email);
//           console.log("Current user's email:", email);
//         } else {
//           console.log("No user is currently signed in.");
//         }
//       });

//       console.log("showing valuess: ",warehouse_create.email);
//         // axios
//         //   .post(API_LINK + "create_warehouse", requestData)
//         //   .then((response) => {
//         //     // setProducts(response.data.products);
//         //     console.log("send data to backend :: ", response.data);
//         //     console.log(typeof response.data.products);
//         //   })
//         //   .catch((err) => console.error(err));
//       setwarehouse_create({
//         title: "",
//         address: "",
//         city: "",
//         country: "",
//       });
//       set_form_validity(false);
//     }
//   };

//   //   useEffect(() => {
//   //     handle_get_cust_data();
//   //     const interval = setInterval(() => {
//   //       const now = new Date();
//   //       const date_seconds = now.getSeconds();
//   //       console.log(date_seconds);

//   //       console.log("showing page options", page_options);
//   //     }, 10000); // Call the function every 10 second (1000 milliseconds)

//   //     return () => {
//   //       clearInterval(interval); // Clean up the interval when the component unmounts
//   //     };
//   //   }, []);

//   return (
//     <div>
//       <Container>
//         <h1>iam in Warehouse</h1>
//         <Box margin="10px">
//           <Stack spacing={2} direction="row" justifyContent="space-evenly">
//             <Button variant="outlined" onClick={create_warehouse}>
//               Create Warehouse
//             </Button>
//           </Stack>
//         </Box>
//         <div>
//           {warehouse_options === "create_warehouse" ? (
//             <div>
//               <ul>
//                 <form onSubmit={handleSubmit}>
//                   <Stack direction="column" spacing={4}>
//                     <TextField
//                       id="standard-basic-1"
//                       label="Title e.g (Amanah Mall warehouse)"
//                       variant="standard"
//                       value={warehouse_create.title}
//                       onChange={(e) =>
//                         handle_create_warehouse("title", e.target.value)
//                       }
//                       required
//                     />
//                     <TextField
//                       id="standard-basic-2"
//                       label="Address e.g (Model town link road)"
//                       variant="standard"
//                       value={warehouse_create.vendor}
//                       onChange={(e) => {
//                         handle_create_warehouse("address", e.target.value);
//                         isFormValid();
//                       }}
//                       required
//                     />
//                     <TextField
//                       id="standard-basic-3"
//                       label="City"
//                       variant="standard"
//                       value={warehouse_create.price}
//                       onChange={(e) => {
//                         handle_create_warehouse("city", e.target.value);
//                         isFormValid();
//                       }}
//                       required
//                     />
//                     <TextField
//                       id="standard-basic-4"
//                       label="Country"
//                       variant="standard"
//                       value={warehouse_create.sku}
//                       onChange={(e) => {
//                         handle_create_warehouse("country", e.target.value);
//                         isFormValid();
//                       }}
//                       required
//                     />
//                     {form_validity ? (
//                       <Button variant="contained" type="submit">
//                         Create
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="contained"
//                         // onClick={handleSubmit}
//                         disabled={!form_validity}
//                       >
//                         Create
//                       </Button>
//                     )}
//                   </Stack>
//                 </form>
//               </ul>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Warehouse;
