// import * as React from "react";
// import { useState, useEffect } from "react";
// import moment from "moment-timezone";
// import {
//   Box,
//   Button,
//   Container,
//   Select,
//   Stack,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import firebase_app from "../Firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import OrderDetails from "./Order_details";
// import convertToUTC from "./UTC_converter";
// import { useSelector, useDispatch } from "react-redux";
// import { setOrders } from "../redux/reducers/orderSlice";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import "../App.css";

// const auth = getAuth(firebase_app);

// // import Select, { SelectChangeEvent } from '@mui/material/Select';

// var API_LINK = "http://localhost:5000/";
// var sortedOrders = "";
// var formattedDate;
// var formattedTime;

// export default function Orders(props) {
//   const [responseData_orders, setresponseData_orders] = useState(
//     props.order_list
//   );
//   const [newOrders, set_newOrders] = useState([]);
//   const { orders, previousOrders } = useSelector((state) => state.orders);

//   const dispatch = useDispatch();


//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const response = await axios.get(API_LINK + "get_all_orders");
//         const newOrders = response.data.orders;

//         console.log("neworders values ", newOrders);
//         // Compare new orders with previous orders to identify newly added orders
//         const addedOrders = newOrders.filter(
//           (newOrder) =>
//             !previousOrders.some(
//               (previousOrder) => previousOrder.id === newOrder.id
//             )
//         );

//         // Dispatch the action to set orders and update previous orders
//         dispatch(setOrders(newOrders));
//         console.log("showing previous orders ", previousOrders);
//         console.log("Newly added orders 1 :", addedOrders);
//         if (addedOrders.length > 0) {
//           // Handle the newly added orders separately
//           console.log("Newly added orders 2:", addedOrders);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle the error
//       }
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [dispatch, previousOrders]);

//   // ----------------------------------------------------------------------------------------------------------------

 

  


//   return (
//     <div className="container">
 
//     </div>
//   );
// }
