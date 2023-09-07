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

const auth = getAuth(firebase_app);

// import Select, { SelectChangeEvent } from '@mui/material/Select';

var API_LINK = "http://localhost:5000/";
var sortedOrders = "";
var formattedDate;
var formattedTime;

export default function Orders(props) {
  const [responseData_orders, setresponseData_orders] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [warehouseCreationDate, setWarehouseCreationDate] =
    useState(/* Set your warehouse creation date here */);

  const [orders, setOrders] = useState();
  const [choose_warehouse, setchoose_warehouse] = useState("");
  const [newOrders, set_newOrders] = useState([]);

  //var responseData_orders = props.order_list || [];
  var email = "";
  const user = auth.currentUser;

  // --------------------------- FETCHING ORDERS --------------------------------------------------------------------

  const sorting_function = () => {
    if (responseData_orders) {
      sortedOrders = responseData_orders
        .slice()
        .sort(
          (a, b) =>
            b.current_total_price_set.shop_money.amount -
            a.current_total_price_set.shop_money.amount
        );
    }
  };

  const get_order = () => {
    handle_get_order_data();
  };

  async function handle_get_order_data() {
    console.log("showing get order data");
    try {
      const response = await axios.get(API_LINK + "get_all_orders");
      console.log("data sent from backend :: ", response.data.orders);
      console.log(typeof response.data);
      if (response.data.orders) {
        setresponseData_orders(
          response.data.orders
            .slice()
            .sort(
              (a, b) =>
                b.current_total_price_set.shop_money.amount -
                a.current_total_price_set.shop_money.amount
            )
        );
        sorting_function(); // Move this line to after setting the state
      } else {
        setresponseData_orders(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      const now = new Date();
      const date_seconds = now.getSeconds();
      console.log(date_seconds);

      handle_get_order_data();
    }, 10000); // Call the function every 10 second (1000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  // ----------------------------------------------------------------------------------------------------------------

  const handle_order_deletion = async (filteredOrders, email) => {
    if (filteredOrders && choose_warehouse) {
      for (const filtered of filteredOrders) {
        console.log("request Data showing ", filtered.line_items[0].sku);
        var requestData = {
          email: email,
          warehouse: choose_warehouse[0].title,
          sku: filtered.line_items[0].sku,
          quantity: filtered.line_items[0].quantity,
        };
        console.log("request Data showing ", requestData);
        if (requestData.sku && requestData.quantity) {
          await axios
            .post(API_LINK + "inventory_update", requestData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => console.error("Error fetching orders:", error));
        }
      }
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
            setOrders(response.data);

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
                      formattedDate = utcTimestamp.split("T")[0];
                      formattedTime = utcTimestamp.split("T")[1].split(".")[0];
                      // console.log("showing formattedDate ", formattedDate);
                      // console.log("showing formattedTime ", formattedTime);
                      if (shopifyDates > formattedDate) {
                        return false;
                      } else if (shopifyDates == formattedDate) {
                        if (shopifyTime > formattedTime) {
                          return false;
                        }
                        return true;
                      }
                    }
                  }
                }
              });
            } else {
              console.log("responseData_orders is null or undefined");
            }

            console.log("Filtered Orders: ", filteredOrders);
            handle_order_deletion(filteredOrders, email);
            set_newOrders(filteredOrders);
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

  return (
    <div>
      <Container>
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
                  <p>details: {JSON.stringify(order, null, 2)}</p>
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
    </div>
  );
}
