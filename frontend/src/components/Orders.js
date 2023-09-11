import * as React from "react";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Box,
  Button,
  Container,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import firebase_app from "../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import OrderDetails from "./Order_details";
import convertToUTC from "./UTC_converter";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../redux/reducers/orderSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../App.css";

const auth = getAuth(firebase_app);

// import Select, { SelectChangeEvent } from '@mui/material/Select';

var API_LINK = "http://localhost:5000/";
var sortedOrders = "";
var formattedDate;
var formattedTime;

export default function Orders(props) {
  const [responseData_orders, setresponseData_orders] = useState(
    props.order_list
  );
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [warehouseCreationDate, setWarehouseCreationDate] = useState();

  //   const [orders, setOrders] = useState();
  const [choose_warehouse, setchoose_warehouse] = useState("");
  const [newOrders, set_newOrders] = useState([]);
  const { orders, previousOrders } = useSelector((state) => state.orders);

  // var Data_orders = props.order_list || [];
  // setresponseData_orders(Data_orders)
  var email = "";
  const user = auth.currentUser;
  const dispatch = useDispatch();
  // --------------------------- FETCHING ORDERS --------------------------------------------------------------------

  // const sorting_function = () => {
  //   if (responseData_orders) {
  //     sortedOrders = responseData_orders
  //       .slice()
  //       .sort(
  //         (a, b) =>
  //           b.current_total_price_set.shop_money.amount -
  //           a.current_total_price_set.shop_money.amount
  //       );
  //   }
  // };

  // const get_order = () => {
  //   handle_get_order_data();
  // };

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   setSeconds((prevSeconds) => prevSeconds + 1);
  //   //   const now = new Date();
  //   //   const date_seconds = now.getSeconds();
  //   //   console.log(date_seconds);

  //   handle_get_order_data();
  //   // }, 10000); // Call the function every 10 second (1000 milliseconds)

  //   // return () => {
  //   //   clearInterval(interval); // Clean up the interval when the component unmounts
  //   // };
  // }, []);

  // async function handle_get_order_data() {
  //   console.log("showing get order data");
  //   try {
  //     const response = await axios.get(API_LINK + "get_all_orders");
  //     console.log("data sent from backend :: ", response.data.orders);
  //     console.log(typeof response.data);
  //     if (response.data.orders) {
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
  //     } else {
  //       setresponseData_orders(0);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle the error
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await axios.get(API_LINK + "get_all_orders");
  //       const newOrders = response.data.orders;

  //       console.log("neworders values ", newOrders);
  //       // Compare new orders with previous orders to identify newly added orders
  //       const addedOrders = newOrders.filter(
  //         (newOrder) =>
  //           !previousOrders.some(
  //             (previousOrder) => previousOrder.id === newOrder.id
  //           )
  //       );

  //       // Dispatch the action to set orders and update previous orders
  //       dispatch(setOrders(newOrders));
  //       console.log("showing previous orders ", previousOrders);
  //       console.log("Newly added orders 1 :", addedOrders);
  //       if (addedOrders.length > 0) {
  //         // Handle the newly added orders separately
  //         console.log("Newly added orders 2:", addedOrders);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle the error
  //     }
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [dispatch, previousOrders]);

  // ----------------------------------------------------------------------------------------------------------------

  const handle_order_deletion = async (skuQuantityMap, email) => {
    var total = 0;
    if (skuQuantityMap && choose_warehouse) {
      const requestDataArray = []; // Create an array to store request data objects

      for (const sku in skuQuantityMap) {
        console.log(`SKU: ${sku} Quantity: ${skuQuantityMap[sku]}`);

        const quantity = skuQuantityMap[sku];
        total += quantity;

        const requestData = {
          email: email,
          warehouse: choose_warehouse[0].title,
          sku: sku,
          quantity: quantity,
        };

        requestDataArray.push(requestData); // Add the requestData object to the array
        console.log("request Data showing ", requestData);
      }

      const requestData2 = {
        email: email,
        warehouse: choose_warehouse[0].title,
        counter: total,
      };
      console.log("Total", total, "Requestdata:", requestData2);

      try {
        const response = await axios.post(
          API_LINK + "get_counter",
          requestData2
        );
        let counter_val = response.data[0].counter;
        console.log("checking value ", response.data[0].counter);
        console.log("getting counter ", response.data[0]);

        if (total > counter_val) {
          try {
            const response = await axios.post(
              API_LINK + "update_counter",
              requestData2
            );
            console.log(response.data);
            // Send all requestData objects in parallel using Promise.all
            const axiosRequests = requestDataArray.map(async (requestData) => {
              if (requestData.sku && requestData.quantity) {
                try {
                  const response = await axios.post(
                    API_LINK + "inventory_update",
                    requestData
                  );
                  console.log("showing update inventory ",response.data);
                } catch (error) {
                  console.error("Error fetching orders:", error);
                }
              }
            });

            await Promise.all(axiosRequests); // Wait for all axios requests to complete
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      console.log("total value is ", total);
    }
    // console.log(`showing email :: ${email}`);
    // console.log(" and filtered orders :: ", filteredOrders);
    // console.log(" and warehouse info :: ", choose_warehouse[0].title);
    // console.log(" and sku info :: ", filteredOrders[1].line_items[0].sku);
    // console.log(
    //   " and quantity info :: ",
    //   filteredOrders[1].line_items[0].quantity
    // );

    // const requestData ={
    //     email: email,
    //     warehouse: choose_warehouse[0].title,
    //     sku: filteredOrders.
    // }

    // await axios
    //   .post(API_LINK + "get_warehouse", { email })
    //   .then((response) => {})
    //   .catch((error) => console.error("Error fetching orders:", error));
  };

  const call_refresher = async () => {
    if (user) {
      email = user.email;
      // try {
      // const response = await axios.get(API_LINK + "get_all_orders");
      // const get_Orders = response.data.orders;
      // setresponseData_orders(get_Orders);

      // console.log("get_Orders values ", get_Orders);
      console.log("showing new Orders values ", newOrders);
      // newOrders.forEach((order) => {
      //   console.log("SKU:", order.line_items[0].sku);
      //   console.log("Quantity:", order.line_items[0].quantity);
      // });

      const skuQuantityMap = {}; // Create an empty object to store SKU quantities

      // Iterate through newOrders and update the SKU quantities
      newOrders.forEach((order) => {
        const sku = order.line_items[0].sku;
        const quantity = order.line_items[0].quantity;

        // If SKU exists in the map, add the quantity to it; otherwise, initialize it
        if (sku in skuQuantityMap) {
          skuQuantityMap[sku] += quantity;
        } else {
          skuQuantityMap[sku] = quantity;
        }
      });

      // Iterate through the map and log the formatted output
      for (const sku in skuQuantityMap) {
        console.log(`SKU: ${sku} Quantity: ${skuQuantityMap[sku]}`);
      }
      handle_order_deletion(skuQuantityMap, email);
      // Compare new orders with previous orders to identify newly added orders
      // const addedOrders = get_Orders.filter(
      //   (newOrder) =>
      //     !previousOrders.some(
      //       (previousOrder) => previousOrder.id === newOrder.id
      //     )
      // );

      //   const addedOrders = newOrders.filter(
      //     (newOrder) =>
      //       !previousOrders.some(
      //         (previousOrder) => previousOrder.id === newOrder.id
      //       )
      //   );

      //   // Dispatch the action to set orders and update previous orders
      //   dispatch(setOrders(get_Orders));
      //   console.log("showing previous orders ", previousOrders);
      //   console.log("showing redux orders ", orders);

      //   console.log("Newly added orders 1 :", addedOrders);
      //   if (addedOrders.length > 0) {
      //     // Handle the newly added orders separately
      //     console.log("Newly added orders 2:", addedOrders);
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   // Handle the error
      // }
    }
  };

  useEffect(() => {
    call_refresher();
  }, [newOrders]);

  const handle_refresh = () => {
    call_refresher();
  };

  const get_warehouse_date = async () => {
    if (props.order_list) {
      console.log("firebase user", user.email);
      if (user) {
        email = user.email;
        await axios
          .post(API_LINK + "get_warehouse", { email })
          .then((response) => {
            // Assuming the data is in response.data
            console.log("showing response in orders ", response.data);
            // setOrders(response.data);

            const shopifyItems = response.data.filter(
              (item) => item.association === "Shopify"
            );
            setchoose_warehouse(shopifyItems);

            // console.log("shopify items", shopifyItems)

            // Extract the dates from the filtered items
            const shopifyData = shopifyItems.map((item) => {
              try {
                const datetime = new Date(item.date);
                const date = datetime.toISOString().split("T")[0];
                console.log("Date:", date);

                return {
                  date: item.date,
                  time: item.time,
                };
              } catch (error) {
                console.error("Error parsing date:", error);
                // Handle the error, e.g., display an error message to the user
              }
            });

            const shopifyDates = shopifyData.map(
              (data) => data.date.split("T")[0]
            );
            const shopifyTime = shopifyData.map((data) => data.time);
            // console.log("showing date ", shopifyDates[0]);
            // console.log("showing time ", shopifyTime[0]);
            console.log("showing fe", responseData_orders);

            if (responseData_orders) {
              var filteredOrders = responseData_orders.filter((order) => {
                if (order.fulfillments && order.fulfillments.length > 0) {
                  if (order.fulfillment_status === "fulfilled") {
                    for (const fulfillment of order.fulfillments) {
                      const utcTimestamp = convertToUTC(fulfillment.created_at);
                      // console.log("type of shopify date", typeof(shopifyDates[0]))
                      // console.log("type of shopify time", typeof(shopifyTime[0]))

                      formattedDate = utcTimestamp.split("T")[0];
                      formattedTime = utcTimestamp.split("T")[1].split(".")[0];
                      // console.log("type of date", typeof(formattedDate))
                      // console.log("type of time", typeof(formattedTime))

                      const shopifyDateTime = new Date(
                        shopifyDates + "T" + shopifyTime
                      );
                      const formattedDateTime = new Date(
                        formattedDate + "T" + formattedTime
                      );

                      if (shopifyDateTime > formattedDateTime) {
                        return false;
                      } else if (
                        shopifyDateTime.getTime() ===
                        formattedDateTime.getTime()
                      ) {
                        return false;
                      }
                      return true;

                      // console.log("showing formattedDate ", formattedDate);
                      // console.log("showing formattedTime ", formattedTime);
                      // if (shopifyDates[0] > formattedDate) {
                      //   return false;
                      // } else if (shopifyDates[0] == formattedDate) {
                      //   if (shopifyTime > formattedTime) {
                      //     return false;
                      //   }
                      //   return true;
                      // }
                    }
                  }
                }
              });
            } else {
              console.log("responseData_orders is null or undefined");
            }

            console.log("Filtered Orders: ", filteredOrders);
            // handle_order_deletion(filteredOrders, email);
            set_newOrders(filteredOrders);
            // if (newOrders)
            // {
            //   call_refresher()
            // }
            // } else {
            //   console.log("responseData_orders is null or undefined");
            // }
          })
          .catch((error) => console.error("Error fetching orders:", error));
      }
    }
  };

  useEffect(() => {
    // Fetch your warehouse date using Axios here
    get_warehouse_date();
  }, [responseData_orders]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  // }, []);

  useEffect(() => {
    if (responseData_orders !== null) {
      setLoading(false); // Data has been loaded
    }
    setresponseData_orders(props.order_list);
    // set_newOrders(props.order_list);
  }, [responseData_orders, props.order_list]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-circle">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handle_refresh}
          >
            Refresh
          </Button>
          <h1>iam in new orders</h1>
          <div>
            <ul>
              {Array.isArray(newOrders) ? (
                newOrders.map((order) => (
                  <li key={order.id}>
                    <h3>{order.title}</h3>
                    <p>ID: {order.id}</p>
                    <p>
                      Amount: {order.current_total_price_set.shop_money.amount}
                    </p>
                    <p>
                      Created At:{" "}
                      {order.fulfillments.map((fulfillment) => {
                        return `${fulfillment.created_at} `;
                      })}
                    </p>
                    <p>current_total_tax: {order.current_total_tax}</p>
                    <p>Fulfillment_status: {order.fulfillment_status}</p>
                    <p>Contact Email: {order.contact_email}</p>

                    <p>financial_status: {order.financial_status}</p>
                    <p>
                      Title:{" "}
                      {order.line_items.map((line_item) => {
                        return `${line_item.name} `;
                      })}
                    </p>
                    <p>
                      Quantity:{" "}
                      {order.line_items.map((line_item) => {
                        return `${line_item.quantity} `;
                      })}
                    </p>

                    <p>
                      Fulfillment_service:{" "}
                      {order.line_items.map((line_item) => {
                        return `${line_item.fulfillment_service} `;
                      })}
                    </p>
                    <p>
                      SKU:{" "}
                      {order.line_items.map((line_item) => {
                        return `${line_item.sku} `;
                      })}
                    </p>
                    <p>
                      Rate:{" "}
                      {order.tax_lines.map((tax_line) => {
                        return `${tax_line.rate} `;
                      })}
                    </p>
                    {/* <p>details: {JSON.stringify(order, null, 2)}</p> */}
                  </li>
                ))
              ) : (
                <p>no order available</p>
              )}
            </ul>
            {/* <h1>showing new values</h1>
           <ul>
            {Array.isArray(responseData_orders) && responseData_orders.length > 0 ? (
              responseData_orders.map((order, index) => (
                <OrderDetails rawOrderData = {order}/>
              ))
            ) : (
              <p>no order available</p>
            )}
          </ul> */}
          </div>
        </Container>
      )}
    </div>
  );
}
