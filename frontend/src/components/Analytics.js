import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexChart from "../Charts/Product_stat";
import ApexChart_2 from "../Charts/Sales_per_day";
import Sales_per_day from "../Charts/Sales_per_day";
import Product_stat from "../Charts/Product_stat";

import MITS_gif from "../images/MITS_Logo.gif";

var API_LINK = "http://localhost:5000/";
var total_orders_count = 0;

function Analytics() {
  const [analytics_options, set_analytics_options] = useState("");
  const [orders_count, set_orders_count] = useState("");
  const [total_sales, set_total_sales] = useState("");
  const [responseData_analytics, setresponseData_analytics] = useState(null);
  const [page_options, set_page_options] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [perDaySales, setPerDaySales] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading

  var productDetails = {};
  var orderDetails = {};
  var perDaySalesData = {};

  // Simulate loading perDaySales data

  //   responseData_analytics.forEach((analytics) => {
  //     const title = analytics.title;
  //     const quantity = analytics.quantity;

  //     if (!quantitiesByTitle[title]) {
  //       quantitiesByTitle[title] = 0;
  //     }
  //     quantitiesByTitle[title] += quantity;
  //     console.log("showing quantity by title 2",quantitiesByTitle[title])

  //   });
  //   console.log("showing quantity by title ",quantitiesByTitle)

  useEffect(() => {
    handle_total_sales();
  }, []);

  function get_total_sales() {
    set_analytics_options("get_total_sales");
    // handle_get_cust_data();
    handle_total_sales();
    set_page_options("get_total_sales");

    console.log("iam in get_total_sales ");
  }

  async function handle_total_sales() {
    try {
      const response = await axios.get(API_LINK + "get_analytics/total_orders");
      console.log("data sent from backend :: ", response.data.orders);
      console.log(typeof response.data);
      setresponseData_analytics(response.data.orders);

      calculate_sales(response.data.orders);
      handle_total_orders_count();
      console.log("showing handle total sales ", responseData_analytics);
      handle_top_products(response.data.orders);
      orderDetails = response.data.orders;
      // sorting_function(); // Move this line to after setting the state
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error
    }
  }

  async function handle_total_orders_count() {
    try {
      const response = await axios.get(
        API_LINK + "get_analytics/total_orders_count"
      );
      console.log("Total orders count data :: ", response.data.count);
      total_orders_count = response.data.count;
      set_orders_count(response.data.count);
      console.log(typeof response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error
    }
  }

  const calculate_sales = (orders) => {
    let total = 0;
    for (const order of orders) {
      const amount = parseFloat(order.total_price_set.shop_money.amount); // Parse the amount as a float
      console.log("amount ", amount);
      total += amount; // Add the amount to the totalSales variable
    }
    set_total_sales(total);
  };

  async function handle_top_products(order_analytics) {
    console.log("iam in handle top producst ", responseData_analytics);
    console.log("iam in handle top producst order_analytics ", order_analytics);
    if (order_analytics) {
      console.log("iam in handle top producst 2");

      await order_analytics.forEach((order) => {
        var quantity_final = 0;
        order.line_items.forEach((item) => {
          const title = item.title;
          const created_at = order.created_at;
          const quantity_item = parseFloat(item.quantity);

          // console.log( `quantity of ${title} is ${item.quantity}`)
          if (productDetails[title]) {
            productDetails[title].line_items.push(item);
            productDetails[title].created_at.push(created_at);
            productDetails[title].quantity += quantity_item;
          } else {
            productDetails[title] = {
              line_items: [item],
              created_at: [created_at],
              quantity: quantity_item,
            };
          }
        });
      });
    }
    //   console.log("showing producst_details ",productDetails["Airpods"].created_at[0])
    // console.log("showing producst_details ",productDetails["Keyboard"])
    sort_product_details();
  }

  const sort_product_details = () => {
    const productDetailsArray = Object.entries(productDetails).map(
      ([title, details]) => ({
        title,
        line_items: details.line_items,
        created_at: details.created_at.map((createdAt) => {
          return new Date(createdAt).toISOString().split("T")[0];
        }),
        quantity: details.quantity,
      })
    );

    // Sort the array based on the total quantity in descending order
    productDetailsArray.sort((a, b) => b.quantity - a.quantity);
    console.log("showing sorted product array 2 ", productDetailsArray);
    // Convert the sorted array back into an object
    const sortedProductDetails = productDetailsArray.reduce((acc, item) => {
      acc[item.title] = {
        line_items: item.line_items,
        created_at: item.created_at,
        quantity: item.quantity,
      };
      return acc;
    }, {});
    productDetails = sortedProductDetails;
    //   for (const title in productDetails) {
    //     console.log(title);
    //   }

    // Now sortedProductDetails contains product details sorted by total quantity
    console.log("showing sorted product array ", sortedProductDetails);
    setTopProducts(productDetailsArray.slice(0, 10));
    setallProducts(productDetailsArray);
    console.log("showing top products ", topProducts);
    console.log("showing All products ", sortedProductDetails);

    calculatePerDaySales();
  };

  const calculatePerDaySales = () => {
    var total_value = 0;
    console.log("showing orderDetails", orderDetails);

    if (orderDetails) {
      // perDaySalesData = {}
      // perDaySalesData.length = 0
      orderDetails.forEach((order) => {
        const date = new Date(order.created_at).toISOString().split("T")[0];
        var totalOrderValue = parseFloat(
          order.current_total_price_set.shop_money.amount
        );

        total_value += totalOrderValue;

        if (perDaySalesData[date]) {
          perDaySalesData[date] += totalOrderValue;
        } else {
          perDaySalesData[date] = totalOrderValue;
        }
      });

      setPerDaySales(perDaySalesData);
      if (perDaySalesData ) {
        setLoading(false);

      }

      console.log("showing per day sales ", typeof perDaySalesData);
      console.log("showing per day sales value", perDaySalesData);
      console.log("showing total sales ", total_value);
    }
  };

  // useEffect(() => {
  //   console.log("perdaysales 1 :: ", perDaySalesData);
  //   // Assuming you have an asynchronous operation to fetch perDaySales
  //   // setTimeout(() => {
  //   if (perDaySalesData && perDaySalesData.length > 0) {
  //     console.log("perdaysales :: ", perDaySalesData);
  //     setLoading(false); // Set loading to false when data is loaded
  //   }
  //   // }, 3000); // Simulate loading for 3 seconds
  // }, [perDaySalesData]);

  //   useEffect(() => {
  //     if (responseData_analytics.length > 0) {
  //       calculatePerDaySales();
  //     }
  //   }, [responseData_analytics]);

  //   async function handle_get_cust_data() {
  //     try {
  //         const response = await axios.get(API_LINK + "get_customers");
  //         console.log("data sent from backend :: ", response.data.customers);
  //         console.log(typeof response.data);
  //         setresponseData_customers(response.data.customers);
  //         sorting_function(); // Move this line to after setting the state
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         // Handle the error
  //       }
  //   };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const now = new Date();
  //       const date_seconds = now.getSeconds();
  //       console.log(date_seconds);
  //       // callFunction();
  //       if (page_options === "get_customers") {
  //         console.log("hey");
  //         handle_get_cust_data();
  //       } else if (page_options === "get_orders") {
  //         console.log("hello");
  //       } else {
  //         console.log("bye");
  //       }
  //       console.log("showing page options", page_options);
  //     }, 10000); // Call the function every 10 second (1000 milliseconds)

  //     return () => {
  //       clearInterval(interval); // Clean up the interval when the component unmounts
  //     };
  //   }, [page_options]);

  // Categorize product details by title
  //   if(responseData_analytics){
  //   responseData_analytics.forEach((order) => {
  //     order.line_items.forEach((item) => {
  //       const title = item.title;
  //       const created_at = order.created_at;

  //     //   if (productDetails[title]) {
  //     //     productDetails[title].push({ ...item, created_at });
  //     //   } else {
  //     //     productDetails[title] = [{ ...item, created_at }];
  //     //   }
  //     console.log("hurray")
  //     });
  //   });
  // }

  //   console.log(productDetails)

  return (
    <div>
      <Container>
        {/* <h1>hi iam in Analytics</h1>
        <Box margin="10px">
          <Stack spacing={2} direction="row" justifyContent="space-evenly">
            <Button variant="outlined" onClick={get_total_sales}>
              Get Total Sales
            </Button>
          </Stack>
        </Box> */}

        <div>
          {/* {analytics_options === "get_total_sales" ? ( */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* <li>Total sales in pkr: ${totalSales}</li>
              <br /> */}

            {/* <ul>
                <li>
                  <h2> Total sales in pkr: </h2>
                  {total_sales} pkr
                </li>
                <br />
                <li>
                  <h2>Total Orders: </h2> {orders_count}
                </li>
                <br />
              </ul> */}
            {/* <li> */}
            {/* <Container> */}
            {loading ? ( // Render the GIF when loading is true
              <img
                src={MITS_gif}
                alt="Loading..."
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  xs={10}
                >
                  <Grid item xs={10}>
                    {perDaySalesData && (
                      <Sales_per_day
                        obj_daySales={perDaySales}
                        name="Per Day Sales"
                      />
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <Product_stat obj1={allProducts} />
                  </Grid>
                </Grid>

                <Grid item xs={2}>
                  <h2
                    style={{
                      color: "#593993",
                      fontStyle: "bold",
                    }}
                  >
                    Top 10 selling products:
                  </h2>

                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      style={{
                        color: "#593993",
                        fontStyle: "bold",
                      }}
                    >
                      <h3 margin="0px">{product.title}</h3>
                      <p>
                        Total Quantity Sold: {product.quantity} <br />
                        Store: {product.quantity}
                      </p>
                      <p></p>
                    </div>
                  ))}

                  {/* <h2>Top 10 selling products:</h2>
                    {topProducts.map((product, index) => (
                      <ul>
                        <li key={index}>
                          <h3>{product.title}</h3>
                          <p>Total Quantity Sold: {product.quantity}</p>
                        </li>
                      </ul>
                    ))} */}
                </Grid>
              </Grid>
            )}

            {/* </Container> */}

            {/* </li> */}

            <br />
            {/* <li>
                  <h2>Each product sold with dates:</h2>
                  {allProducts.map((product, index) => (
                    <ul>
                      <li key={index}>
                        <h3>{product.title}</h3>
                        <p>Created At:</p>
                        <ul>
                          {product.created_at.map((createdAt, idx) => (
                            <li key={idx}>{createdAt}</li>
                          ))}
                        </ul>
                        <p>Line Items:</p>
                        <ul>
                          {product.line_items.map((lineItem, idx) => (
                            <li key={idx}>
                              Title: {lineItem.title}, Quantity:{" "}
                              {lineItem.quantity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ))}
                </li> */}
            <br />

            {/* <li>
                  <h2>Per day sale with dates (in detail):</h2>
                </li>
                {Object.entries(perDaySales).map(([date, sales]) => (
                  <li key={date}>
                    <p>Date: {date}</p>
                    <p>Total Sales: {sales}</p>
                  </li>
                ))} */}

            {/* <Product_stat obj1={allProducts} /> */}

            <br />
            {/* <li>
                  {Array.isArray(responseData_analytics) &&
                  responseData_analytics.length > 0 ? (
                    responseData_analytics.map((analytics) => (
                      <li key={analytics.id}>
                        <h3>{analytics.title}</h3>
                        <p>ID: {analytics.id}</p>
                        <p>Date: {analytics.created_at}</p>
                        Addresses:{" "}
                        {analytics.line_items.map((line_items) => {
                          return `
                          key=${line_items.id}
                            Title: ${line_items.title}
                            Quantity: ${line_items.quantity}`;
                        })}
                        <p>details: {JSON.stringify(analytics, null, 2)}</p>
                      </li>
                    ))
                  ) : (
                    <p>no analytics data available</p>
                  )}
                </li> */}
            {/* </ul> */}

            {/* <TableContainer style={{ maxHeight: '58vh', overflowY:'scroll' }}> */}
            {/* <ul>
                {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
                    sortedCustomers.map((customer) => (
                    <li key={customer.id}>
                      <h3>{customer.title}</h3>
                      <p>ID: {customer.id}</p>
                      <p>email: {customer.email}</p>
                      <p>first_name {customer.first_name}</p>
                      <p>last_name: {customer.last_name}</p>
                      <p>orders_count: {customer.orders_count}</p>
                      <p>total_spent: {customer.total_spent}</p>
                      <p>
                        Addresses:{" "}
                        {customer.addresses.map((addresses) => {
                          return `${addresses.address1}, ${addresses.city}, ${addresses.country}`;
                        })}
                      </p>
                      <p>
                        Phone Number:{" "}
                        {customer.addresses.map((addresses) => {
                          return `${addresses.phone}`;
                        })}
                      </p>
                      <p>details: {JSON.stringify(customer, null, 2)}</p>
                    </li>
                  ))
                ) : (
                  <p>no customer data available</p>
                )}
              </ul> */}
          </div>
          {/* ) : (
            ""
          )} */}
        </div>
      </Container>
    </div>
  );
}

export default Analytics;
