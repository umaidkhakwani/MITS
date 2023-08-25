import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React, { useContext } from "react";
import axios from "axios";
import SignUp from "./Registration/SignUp";
import Login from "./Registration/Login";
import Home from "./Registration/Home";
import About from "./Registration/About";
import Analytics from "./components/Analytics";
import Forget_password from "./Registration/Forget_password";
import Product from "./components/Products";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element = {<Login />}/>
      <Route path="/about" element = {<About />}/>
      <Route path="/signup" element = {<SignUp />}/>
      <Route path="/login" element = {<Login />}/>
      <Route path="/forget_pass" element = {<Forget_password />}/>
      <Route path="/dashboard" element = {<Product />}/>
    </Route>)
  );

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
    // <Router>
    //        <div className="App">
    //         <ul className="App-header">
    //           <li>
    //             <Link to="/">Login</Link>
    //           </li>
    //           <li>
    //             <Link to="/signup">About Us</Link>
    //           </li>
    //         </ul>
    //        <Routes>
    //              <Route exact path='/' element={< Login />}></Route>
    //              <Route exact path='/signup' element={< SignUp />}></Route>
    //       </Routes>
    //       </div>
    //    </Router>
    // <Login />
  );
};

const Root = () => {
  return (
    <>
      {/* {" "}
      <div>
        {" "}
        <Link to="/">Home</Link>
        <Link to="/about">about</Link>
      </div> */}
      <div><Outlet /></div>
    </>
  );
};

// const Home = () => {
//   return (
//     <div>
//       <h1>Home</h1>
//     </div>
//   );
// };

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//     </div>
//   );
// };

// const Contact = () => {
//   return (
//     <div>
//       <h1>Contact</h1>
//     </div>
//   );
// };

export default App;

// import * as React from "react";
// import { useState, useEffect } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import {
//   Box,
//   Button,
//   Container,
//   Select,
//   Stack,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import Customers from "../src/components/Customers";
// import Analytics from "./components/Analytics";
// import ApexChart from "./Charts/Product_stat";
// import ApexChart_2 from "./Charts/Sales_per_day";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import SignUp from "./Registration/SignUp";
// import SignIn from "./Registration/Login";
// import SignInSide from "./Registration/SignUp";
// // import Select, { SelectChangeEvent } from '@mui/material/Select';

// var API_LINK = "http://localhost:5000/";
// var sortedOrders = "";

// export default function App() {
//   const [inventory, setInventory] = useState("");
//   const [product_options, setProduct_options] = useState("");
//   const [order_options, set_order_options] = useState("");
//   const [page_options, set_page_options] = useState("");
//   const [responseData_products, setresponseData_products] = useState(null);
//   const [responseData_orders, setresponseData_orders] = useState(null);
//   const [form_validity, set_form_validity] = useState(false);
//   const [product_create, setProduct_create] = useState([
//     {
//       title: "",
//       vendor: "",
//       price: "",
//       sku: "",
//       quantity: "",
//       product_type: "",
//       description: "",
//     },
//   ]);
//   const [seconds, setSeconds] = useState(0);

//   const sorting_function = () => {
//     if (responseData_orders) {
//       sortedOrders = responseData_orders
//         .slice()
//         .sort(
//           (a, b) =>
//             b.current_total_price_set.shop_money.amount -
//             a.current_total_price_set.shop_money.amount
//         );
//     }
//   };

//   const create_prod = () => {
//     setProduct_options("create");
//     set_page_options("create_products");
//   };

//   const update_prod = () => {
//     setProduct_options("update");
//     set_page_options("update_products");
//   };

//   const delete_prod = () => {
//     setProduct_options("delete");
//     set_page_options("delete_products");
//   };

//   const get_prod_data = () => {
//     setProduct_options("get_data");
//     set_page_options("get_products");
//     handle_get_prod_data();
//   };

//   //=========================== Orders  ================================

//   const get_order = () => {
//     set_order_options("get_data");
//     handle_get_order_data();
//     set_page_options("get_orders");
//   };

//   async function handle_get_order_data() {
//     console.log("showing get order data");
//     try {
//       const response = await axios.get(API_LINK + "get_orders");
//       console.log("data sent from backend :: ", response.data.orders);
//       console.log(typeof response.data);
//       setresponseData_orders(
//         response.data.orders
//           .slice()
//           .sort(
//             (a, b) =>
//               b.current_total_price_set.shop_money.amount -
//               a.current_total_price_set.shop_money.amount
//           )
//       );
//       sorting_function(); // Move this line to after setting the state
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error
//     }
//   }
//   //======================================================================

//   const get_default = () => {
//     set_page_options("default");
//     console.log(page_options);
//   };

//   const handle_get_prod_data = () => {
//     console.log("showing get product data");
//     axios
//       .get(API_LINK + "getdata")
//       .then((response) => {
//         // setProducts(response.data.products);
//         console.log("send data to backend :: ", response.data.products);
//         <h1>{response}</h1>;
//         console.log(typeof response.data);
//         setresponseData_products(response.data.products);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         // Handle the error
//       });
//   };

//   const handleChange = (event) => {
//     setInventory(event.target.value);
//     console.log("showing inventory", event.target.value);
//   };

//   const handle_create_prod = (field, value) => {
//     // setInventory(event.target.value);
//     // console.log("showing", event.target.value);
//     setProduct_create((prevItem) => ({
//       ...prevItem,
//       [field]: value,
//     }));
//     console.log("showing created products", product_create);
//   };

//   const handleSubmit = () => {
//     if (form_validity) {
//       console.log(isFormValid());
//       const requestData = {
//         product: product_create,
//       };
//       console.log("into handle submit", requestData);
//       axios
//         .post(API_LINK + "create_product", requestData)
//         .then((response) => {
//           // setProducts(response.data.products);
//           console.log("send data to backend :: ", response.data);
//           console.log(typeof response.data.products);
//         })
//         .catch((err) => console.error(err));
//       setProduct_create({
//         title: "",
//         vendor: "",
//         price: "",
//         sku: "",
//         quantity: "",
//         product_type: "",
//         description: "",
//       });
//       set_form_validity(false);
//     }
//   };

//   const isFormValid = () => {
//     if (
//       product_create.title !== "" &&
//       product_create.vendor !== "" &&
//       product_create.price !== "" &&
//       product_create.sku !== "" &&
//       product_create.quantity !== "" &&
//       product_create.product_type !== "" &&
//       product_create.description !== ""
//     ) {
//       set_form_validity(true);
//       console.log("showing form validity", form_validity);
//     } else {
//       set_form_validity(false);
//       console.log("showing form validity", form_validity);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds + 1);
//       const now = new Date();
//       const date_seconds = now.getSeconds();
//       console.log(date_seconds);
//       // callFunction();
//       if (page_options === "get_products") {
//         console.log("hey");
//         handle_get_prod_data();
//       } else if (page_options === "get_orders") {
//         console.log("hello");
//         handle_get_order_data();
//       } else {
//         console.log("bye");
//       }
//       console.log("showing page options", page_options);
//     }, 10000); // Call the function every 10 second (1000 milliseconds)

//     return () => {
//       clearInterval(interval); // Clean up the interval when the component unmounts
//     };
//   }, [page_options]);

//   return (
//     <div>
//       <div>
//         <Container
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "100%",
//           }}
//         >
//           <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
//             <InputLabel id="demo-simple-select-autowidth-label">
//               Inventory
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-autowidth-label"
//               id="demo-simple-select-autowidth"
//               value={inventory}
//               onChange={handleChange}
//               autoWidth
//               label="Inventory"
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value={10}>Products</MenuItem>
//               <MenuItem value={21}>Orders</MenuItem>
//               <MenuItem value={31} onClick={get_default}>
//                 Customers
//               </MenuItem>
//               <MenuItem value={41} onClick={get_default}>
//                 Analytics
//               </MenuItem>
//               <MenuItem value={51} onClick={get_default}>
//                 Signup
//               </MenuItem>
//             </Select>
//             {inventory === 10 ? (
//               <Container sx={{ margin: "20px" }}>
//                 <Box margin="10px">
//                   <Stack
//                     spacing={2}
//                     direction="row"
//                     justifyContent="space-evenly"
//                   >
//                     <Button variant="outlined" onClick={create_prod}>
//                       Create
//                     </Button>

//                     <Button variant="outlined" onClick={update_prod}>
//                       Update
//                     </Button>
//                     <Button variant="outlined" onClick={delete_prod}>
//                       Delete
//                     </Button>

//                     <Button variant="outlined" onClick={get_prod_data}>
//                       Get Data
//                     </Button>
//                   </Stack>
//                 </Box>
//                 <div>
//                   {product_options === "create" ? (
//                     <Stack direction="column" spacing={4}>
//                       <TextField
//                         id="standard-basic"
//                         label="Title e.g (Brown Gloves)"
//                         variant="standard"
//                         value={product_create.title}
//                         onChange={(e) =>
//                           handle_create_prod("title", e.target.value)
//                         }
//                         required
//                       />
//                       <TextField
//                         id="standard-basic"
//                         label="Vendor e.g (Your store name)"
//                         variant="standard"
//                         value={product_create.vendor}
//                         onChange={(e) => {
//                           handle_create_prod("vendor", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />
//                       <TextField
//                         id="standard-basic"
//                         label="Price in PKR"
//                         variant="standard"
//                         value={product_create.price}
//                         onChange={(e) => {
//                           handle_create_prod("price", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />
//                       <TextField
//                         id="standard-basic"
//                         label="Valid SKU"
//                         variant="standard"
//                         value={product_create.sku}
//                         onChange={(e) => {
//                           handle_create_prod("sku", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />

//                       <TextField
//                         id="standard-basic"
//                         label="Quantity (numeric value)"
//                         variant="standard"
//                         value={product_create.quantity}
//                         onChange={(e) => {
//                           handle_create_prod("quantity", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />

//                       <TextField
//                         id="standard-basic"
//                         label="Type of product e.g Gloves, snowboard etc"
//                         variant="standard"
//                         value={product_create.product_type}
//                         onChange={(e) => {
//                           handle_create_prod("product_type", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />
//                       <TextField
//                         id="standard-basic"
//                         label="Description"
//                         variant="standard"
//                         value={product_create.description}
//                         onChange={(e) => {
//                           handle_create_prod("description", e.target.value);
//                           isFormValid();
//                         }}
//                         required
//                       />
//                       {form_validity ? (
//                         <Button variant="contained" onClick={handleSubmit}>
//                           Create
//                         </Button>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           // onClick={handleSubmit}
//                           disabled={!form_validity}
//                         >
//                           Create
//                         </Button>
//                       )}
//                     </Stack>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//                 <div>
//                   {product_options === "update" ? (
//                     <h1>hey iam in update</h1>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//                 <div>
//                   {product_options === "delete" ? (
//                     <h1>hey iam in delete</h1>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//                 <div>
//                   {product_options === "get_data" ? (
//                     <div>
//                       <ul>
//                         {Array.isArray(responseData_products) ? (
//                           responseData_products.map((product) => (
//                             <li key={product.id}>
//                               <h3>{product.title}</h3>
//                               <p>ID: {product.id}</p>
//                               <p>Product Type: {product.product_type}</p>

//                               <p>
//                                 Prices:{" "}
//                                 {product.variants.map((variant) => {
//                                   return `${variant.price}`;
//                                 })}
//                               </p>
//                               <p>
//                                 Inventory Quantity:{" "}
//                                 {product.variants.map((variant) => {
//                                   return `${variant.inventory_quantity}`;
//                                 })}
//                               </p>
//                               <p>
//                                 SKU:{" "}
//                                 {product.variants.map((variant) => {
//                                   return `${variant.sku}`;
//                                 })}
//                               </p>
//                               <p>details: {JSON.stringify(product, null, 2)}</p>
//                             </li>
//                           ))
//                         ) : (
//                           <p>no products available</p>
//                         )}
//                       </ul>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </Container>
//             ) : inventory === 21 ? (
//               <Container>
//                 <h1>iam in orders</h1>
//                 <Box margin="10px">
//                   <Stack
//                     spacing={2}
//                     direction="row"
//                     justifyContent="space-evenly"
//                   >
//                     <Button variant="outlined" onClick={get_order}>
//                       Get data
//                     </Button>
//                   </Stack>
//                 </Box>
//                 <div>
//                   {order_options === "get_data" ? (
//                     <div>
//                       <ul>
//                         {Array.isArray(responseData_orders) ? (
//                           responseData_orders.map((order) => (
//                             <li key={order.id}>
//                               <h3>{order.title}</h3>
//                               <p>ID: {order.id}</p>
//                               <p>
//                                 Amount:{" "}
//                                 {
//                                   order.current_total_price_set.shop_money
//                                     .amount
//                                 }
//                               </p>
//                               <p>
//                                 current_total_tax: {order.current_total_tax}
//                               </p>
//                               <p>
//                                 Fulfillment_status: {order.fulfillment_status}
//                               </p>
//                               <p>Contact Email: {order.contact_email}</p>

//                               <p>financial_status: {order.financial_status}</p>
//                               <p>
//                                 Title:{" "}
//                                 {order.line_items.map((line_item) => {
//                                   return `${line_item.name} `;
//                                 })}
//                               </p>
//                               <p>
//                                 Quantity:{" "}
//                                 {order.line_items.map((line_item) => {
//                                   return `${line_item.quantity} `;
//                                 })}
//                               </p>
//                               <p>
//                                 Fulfillment_service:{" "}
//                                 {order.line_items.map((line_item) => {
//                                   return `${line_item.fulfillment_service} `;
//                                 })}
//                               </p>
//                               <p>
//                                 SKU:{" "}
//                                 {order.line_items.map((line_item) => {
//                                   return `${line_item.sku} `;
//                                 })}
//                               </p>
//                               <p>
//                                 Rate:{" "}
//                                 {order.tax_lines.map((tax_line) => {
//                                   return `${tax_line.rate} `;
//                                 })}
//                               </p>
//                               <p>details: {JSON.stringify(order, null, 2)}</p>
//                             </li>
//                           ))
//                         ) : (
//                           <p>no order available</p>
//                         )}
//                       </ul>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </Container>
//             ) : inventory === 31 ? (
//               <div>
//                 <Customers />
//               </div>
//             ) : inventory === 41 ? (
//               <div>
//                 <Analytics />
//               </div>
//             ) : inventory === 51 ? (
//               <div>
//                 <SignInSide />
//                 <BrowserRouter>
//                   <Switch>
//                     <Route path="/" exact component={App} />
//                     <Route path="/signin" component={SignIn} />
//                   </Switch>
//                 </BrowserRouter>
//               </div>
//             ) : (
//               <div>
//                 <h1>welcome to mepStore</h1>
//               </div>
//             )}
//           </FormControl>
//         </Container>
//         {/* <ApexChart /> */}
//       </div>
//     </div>
//   );
// }

// // import React, { useState, useEffect } from "react";
// // import Button from "@mui/material/Button";
// // import Stack from "@mui/material/Stack";
// // import axios from "axios";
// // import {
// //   Container,
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// // } from "@mui/material";

// // var API_LINK = "http://localhost:5000/";

// // const App = () => {
// //   const [products, setProducts] = useState([]);
// //   const [product_id, setProduct_id] = useState([]);
// //   const [product_clicked, setProduct_clicked] = useState(false);
// //   const [product_options, setProduct_options] = useState(0);

// //   const [orders, setOrders] = useState([]);
// //   const [seconds, setSeconds] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setSeconds((prevSeconds) => prevSeconds + 1);
// //       const now = new Date();
// //       const date_seconds = now.getSeconds();
// //       console.log(date_seconds);
// //       // callFunction();
// //     }, 60000); // Call the function every 10 second (1000 milliseconds)

// //     return () => {
// //       clearInterval(interval); // Clean up the interval when the component unmounts
// //     };
// //   }, []);

// //   const callFunction = () => {
// //     axios.get(API_LINK).then((response) => {
// //       setProducts(response.data.orders);
// //       console.log(response.data.orders);
// //       console.log(typeof response.data.orders);
// //     });
// //     // Do something here.
// //     // Display the change in seconds on screen.
// //     // const changeInSeconds = seconds;
// //     // document.getElementById('change-in-seconds').innerHTML = changeInSeconds;
// //   };

// //   const handleClick_products = () => {
// //     // API_LINK = API_LINK+"getdata"
// //     setProduct_clicked(true)
// //     axios.get(API_LINK + "getdata").then((response) => {
// //       setProducts(response.data.products);
// //       console.log(response.data.products);
// //       console.log(typeof response.data.products);
// //     });
// //   };

// //   const handleClick_orders = () => {
// //     // API_LINK = API_LINK+"getdata"
// //     axios.get(API_LINK + "get_orders").then((response) => {
// //       setOrders(response.data.orders);
// //       console.log(response.data.orders);
// //       console.log(typeof response.data.orders);
// //     });
// //   };

// //   const handleChange = (event) => {
// //     setProduct_id(event.target.value);
// //   };

// //   const handleChange_prod_options = (event) => {
// //     setProduct_options(event.target.value);
// //     console.log("showing: ",product_options);
// //   };
// //   const newFun = (event) => {
// //     console.log("calling fun",event.target.value);
// //   };
// //   const newFun2 = (event) => {
// //     console.log("calling fun2");
// //   };

// //   return (
// //     <div>
// //       <h2>Products List</h2>
// //       <div>The current minute is: {seconds}</div>
// //       <Stack spacing={2} direction="row" justifyContent="space-evenly">
// //         <Button onClick={handleClick_products} variant="outlined">
// //           Products
// //         </Button>
// //         <Button onClick={handleClick_orders} variant="outlined">
// //           Orders
// //         </Button>
// //       </Stack>
// //       <Stack spacing={2} direction="row" justifyContent="space-evenly">
// //         <Container>
// //           <div>
// //           { product_clicked ? (
// //             <div>
// //             <FormControl sx={{ m: 1, minWidth: 150 }}>
// //               <InputLabel id="demo-simple-select-autowidth-label">
// //                 Options
// //               </InputLabel>
// //               <Select
// //                 labelId="demo-simple-select-autowidth-label"
// //                 id="demo-simple-select-autowidth"
// //                 // value={product_options}
// //                 // onChange={handleChange_pro+d_options}
// //                 autoWidth
// //                 label="Options"
// //               >
// //                 <MenuItem value="{null}">
// //                   <em>None</em>
// //                 </MenuItem>
// //                 <MenuItem value="create">Create</MenuItem>
// //                 <MenuItem value="update">Update</MenuItem>
// //                 <MenuItem value="delete">Delete</MenuItem>

// //               </Select>
// //             </FormControl>

// //             <FormControl sx={{ m: 1, minWidth: 150 }}>
// //               <InputLabel id="demo-simple-select-autowidth-label">
// //                 Products
// //               </InputLabel>
// //               <Select
// //                 labelId="demo-simple-select-autowidth-label"
// //                 id="demo-simple-select-autowidth"
// //                 value={product_id}
// //                 onChange={handleChange}
// //                 autoWidth
// //                 label="Products"
// //               >
// //                 <MenuItem value="{null}">
// //                   <em>None</em>
// //                 </MenuItem>
// //                 {products.map((product) => (
// //                   <MenuItem
// //                     key={product.id}
// //                     value={product.id}
// //                     optionLabel={product.title}
// //                   >
// //                     {product.title}
// //                   </MenuItem>
// //                 ))}

// //               </Select>
// //             </FormControl>
// //             </div>
// //                   ) : ("")}
// //             <ul>
// //               {Array.isArray(products) ? (
// //                 products.map((product) => (
// //                   <li key={product.id}>
// //                     <h3>{product.title}</h3>
// //                     <p>ID: {product.id}</p>
// //                     <p>details: {JSON.stringify(product, null, 2)}</p>
// //                   </li>
// //                 ))
// //               ) : (
// //                 <p>no products available</p>
// //               )}
// //             </ul>
// //           </div>
// //         </Container>
// //         <Container>
// //           <div>
// //             <ul>
// //               {Array.isArray(orders) ? (
// //                 orders.map((order) => (
// //                   <li key={order.id}>
// //                     <h3>{order.title}</h3>
// //                     <p>ID: {order.id}</p>
// //                     <p>
// //                       Amount: {order.current_total_price_set.shop_money.amount}
// //                     </p>
// //                     <p>details: {JSON.stringify(order, null, 2)}</p>
// //                   </li>
// //                 ))
// //               ) : (
// //                 <p>no order available</p>
// //               )}
// //             </ul>
// //           </div>
// //         </Container>
// //       </Stack>
// //     </div>
// //   );
// // };

// // export default App;
