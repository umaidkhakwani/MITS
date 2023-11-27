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
//   import ApexChart from "../Charts/Product_stat";
//   import ApexChart_2 from "../Charts/Sales_per_day";
import Sales_per_day from "../../Charts/Sales_per_day";
import Product_stat from "../../Charts/Product_stat";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

import MITS_gif from "../../images/MITS_Logo.gif";
import SalesCard from "../../containers/SalesCard";

var API_LINK = "http://localhost:5000/";
var total_orders_count = 0;
const auth = getAuth(firebase_app);

function SKU_prediction() {
  const [analytics_options, set_analytics_options] = useState("");
  const [orders_count, set_orders_count] = useState("");
  const [total_sales, set_total_sales] = useState("");
  const [responseData_analytics, setresponseData_analytics] = useState(null);
  const [page_options, set_page_options] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [perDaySales, setPerDaySales] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading

  const [result_array, setresult_array] = useState([]); // State to track loading

  const user = auth.currentUser;
  const company2 = useSelector((state) => state.users);

  var productDetails = {};
  var orderDetails = {};
  var perDaySalesData = {};
  var email = "";

  useEffect(() => {
    handle_pos_sale();
    // handle_total_sales();
  }, []);

  function get_total_sales() {
    set_analytics_options("get_total_sales");
    // handle_get_cust_data();
    handle_total_sales();
    set_page_options("get_total_sales");

    console.log("iam in get_total_sales ");
  }

  async function handle_pos_sale() {
    if (user) {
      email = user.email;
      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );

      try {
        const requestData = {
          company: filteredCompanies[0].company,
        };
        // console.log("data sent from frontend :: ", requestData);
        const response = await axios.post(
          API_LINK + "pos_stock_details",
          requestData
        );
        // console.log(
        //   "data in handle_pos_sale in SKU_PREDICTION :: ",
        //   response.data[0]
        // );
        const responseArray = response.data[0]; // Assuming response.data[0] is an array of objects

        const skuData = responseArray
          .map((item) => {
            const slicedPart = item.description.slice(0, -1); // Remove the closing parenthesis
            // console.log("slicedPart", slicedPart);
            // Split the 'description' field into individual parts
            const descriptionParts = slicedPart.split(",");
            const itemdate = item.date.split("T")[0];

            // Create an array of objects for each part
            const skuObjects = descriptionParts.map((part) => {
              //   console.log("part", part);

              const [sku, quantity] = part.split("(");
              //   console.log("sku", sku);
              //   console.log("quantity", quantity);

              return {
                sku: sku.trim(),
                date: itemdate,
                quantity: parseInt(quantity, 10) || 1, // Assuming a default quantity of 1 if not specified
              };
            });

            return skuObjects;
          })
          .flat(); // Flatten the array of arrays into a single array

        // console.log("showing data", skuData);

        const aggregatedData = new Map();

        skuData.forEach((item) => {
          const key = `${item.sku}/?/${item.date}`; // Create a unique key for each SKU and date combination

          if (aggregatedData.has(key)) {
            // If the key already exists in the map, add the quantity to the existing value
            aggregatedData.set(key, aggregatedData.get(key) + item.quantity);
          } else {
            // If the key doesn't exist, create a new entry with the quantity
            aggregatedData.set(key, item.quantity);
          }
        });

        // Convert the aggregated map back to an array of objects
        const result = Array.from(aggregatedData, ([key, quantity]) => {
          const [sku, date] = key.split("/?/"); // Split the key to get SKU and date
          return { sku, date, quantity };
        });

        // console.log("showing result", result);
        const resultArray = [];

        // Create a map to group data by "sku"
        const skuMap = new Map();

        result.forEach((item) => {
          const { sku, date, quantity } = item;

          if (skuMap.has(sku)) {
            // If the "sku" already exists in the map, push the data to the "data" array
            skuMap.get(sku).data.push({ date, quantity });
          } else {
            // If the "sku" doesn't exist, create a new entry with "sku" and an array containing the data
            skuMap.set(sku, { sku, data: [{ date, quantity }] });
          }
        });

        // Convert the map values back to an array
        resultArray.push(...skuMap.values());

        // console.log("showing resultArray", resultArray);

        // Find the least date in the resultArray
        let leastDate = "9999-12-31"; // Initialize with a future date
        resultArray.forEach((item) => {
          item.data.forEach((data) => {
            // console.log("showing data", data);
            if (leastDate > data.date) {
              leastDate = data.date;
            }
          });
        });

        // Get the current date in the same format
        const currentDate = new Date().toISOString().split("T")[0];
        // console.log("showing currentDate", currentDate);

        // Initialize an array to store the result data
        const resultDataArray = [];

        // Loop through each SKU and fill in missing dates between leastDate and currentDate
        resultArray.forEach((item) => {
          const sku = item.sku;
          const data = item.data;

          const dateMap = new Map();

          // Initialize the dateMap with 0 quantity for all dates between leastDate and currentDate
          let currentDateObj = new Date(leastDate);
          const lastDateObj = new Date(currentDate);
          while (currentDateObj <= lastDateObj) {
            const dateKey = currentDateObj.toISOString().split("T")[0];
            dateMap.set(dateKey, 0);
            currentDateObj.setDate(currentDateObj.getDate() + 1);
          }

          // Fill in quantities from the original data
          data.forEach((dataItem) => {
            dateMap.set(dataItem.date, dataItem.quantity);
          });

          // Convert the dateMap back to an array of objects
          const resultData = Array.from(dateMap, ([date, quantity]) => ({
            date,
            quantity,
          }));

          resultDataArray.push({ sku, data: resultData });
        });

        // console.log("showing resultDataArray", resultDataArray);
        handle_total_sales(resultDataArray);
        // setresult_array(resultDataArray);
      } catch (error) {
        console.log("error in handle_pos_sale");
        console.error("Error fetching data:", error);
      }
    }
  }

  async function handle_total_sales(resultDataArray) {
    try {
      const response = await axios.post(API_LINK + "get_analytics/total_orders");
      //   console.log("data sent from backend :: ", response.data.orders);
      console.log(typeof response.data);
      setresponseData_analytics(response.data.orders);

      calculate_sales(response.data.orders);
      handle_total_orders_count();
      //   console.log("showing handle total sales ", responseData_analytics);
      handle_top_products(response.data.orders);
      orderDetails = response.data.orders;
      //   console.log(
      //     "showing orderDetails ",
      //     orderDetails[0].fulfillments.fulfillments
      //   );

      const salesData = [];
      let lowestDate = null;
      const currentDate = new Date();

      // Function to format a date as "YYYY-MM-DD"
      //   function formatDate(date) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
      const day = currentDate.getDate().toString().padStart(2, "0");
      let new_currentDate = `${year}-${month}-${day}`;

      // Iterate through each order in responseData_analytics
      orderDetails.forEach((order) => {
        // Check if fulfillments array exists and has at least one item
        if (order.fulfillments && order.fulfillments.length > 0) {
          const createdDate = order.fulfillments[0].created_at.split("T")[0]; // Use the first fulfillment's created_at

          // Iterate through each line item in the order
          order.line_items.forEach((item) => {
            if (item.sku != "" && item.sku != null) {
              if (lowestDate === null || createdDate < lowestDate) {
                lowestDate = createdDate;
              }
              // Check if an entry with the same SKU and date already exists
              const existingEntry = salesData.find(
                (entry) =>
                  entry.sku === item.sku && entry.created_at === createdDate
              );

              if (existingEntry) {
                // If an entry exists, add the quantity to the existing entry
                existingEntry.quantity += item.quantity;
              } else {
                // If no entry exists, create a new entry
                const salesItem = {
                  sku: item.sku || "",
                  created_at: createdDate,
                  quantity: item.quantity,
                };
                // Add the object to the salesData array
                salesData.push(salesItem);
              }
            }
          });
        }
      });

      //   console.log("Array of sales data with quantities aggregated:", salesData);
      //   console.log("lowest date:", lowestDate);
      //   console.log("new_currentDate:", new_currentDate);

      const skuData = {};

      salesData.forEach((item) => {
        const date = item.created_at;
        const sku = item.sku;
        if (!skuData[sku]) {
          skuData[sku] = {};
        }
        if (!skuData[sku][date]) {
          skuData[sku][date] = 0;
        }
        skuData[sku][date] += item.quantity;
      });

      // Create an array for each SKU with dates and quantities
      const result = Object.keys(skuData).map((sku) => {
        const data = [];
        let lowestDate_new = lowestDate;
        while (lowestDate_new <= new_currentDate) {
          data.push({
            date: lowestDate_new,
            quantity: skuData[sku][lowestDate_new] || 0,
          });
          const currentDateObj = new Date(lowestDate_new);
          currentDateObj.setDate(currentDateObj.getDate() + 1);
          lowestDate_new = currentDateObj.toISOString().split("T")[0];
        }
        return { sku, data };
      });

      //   console.log("result", result);
      //   console.log("resultDataArray in total sales in SKU_prediction", resultDataArray);

      const mergedArray = [...result, ...resultDataArray].reduce((acc, obj) => {
        const existingObj = acc.find((item) => item.sku === obj.sku);
        if (existingObj) {
          existingObj.data.push(...obj.data);
        } else {
          acc.push({ ...obj });
        }
        return acc;
      }, []);

      //   console.log("showing merged_array",mergedArray);
      setresult_array(mergedArray);
      // console.log("skuData",result[0].sku);
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
    // console.log("showing producst_details ", productDetails);

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
    // console.log("showing sorted product array ", sortedProductDetails);
    setTopProducts(productDetailsArray.slice(0, 10));
    setallProducts(productDetailsArray);
    // console.log("showing top products ", topProducts);
    // console.log("showing All products ", sortedProductDetails);

    calculatePerDaySales();
  };

  const calculatePerDaySales = () => {
    var total_value = 0;
    // console.log("showing orderDetails", orderDetails);

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
      if (perDaySalesData) {
        setLoading(false);
      }

      //   console.log("showing per day sales ", typeof perDaySalesData);
      //   console.log("showing per day sales value", perDaySalesData);
      //   console.log("showing total sales ", total_value);
    }
  };

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
            {loading ? ( // Render the GIF when loading is true
              <img
                src={MITS_gif}
                alt="Loading..."
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              // <Grid
              //   container
              //   spacing={2}
              //   direction="row"
              //   justifyContent="center"
              //   alignItems="center"
              // >
              //   <Grid
              //     container
              //     spacing={2}
              //     direction="column"
              //     justifyContent="center"
              //     alignItems="center"
              //     xs={10}
              //   >
              //     <Grid item xs={10}>
              //       {perDaySalesData && (
              //         <Sales_per_day
              //           obj_daySales={perDaySales}
              //           name="Per Day Sales"
              //         />
              //       )}
              //     </Grid>
              //     <Grid item xs={10}>
              //       <Product_stat obj1={allProducts} />
              //     </Grid>
              //   </Grid>

              // </Grid>
              ""
            )}

            <br />

            {/* <li>
              {Array.isArray(responseData_analytics) &&
              responseData_analytics.length > 0 ? (
                responseData_analytics.map((analytics) => (
                  <li key={analytics.id}>
                    <h3>{analytics.title}</h3>
                    <p>ID: {analytics.id}</p>
                    <p>Date: {analytics.created_at}</p>
                    <p>
                      fulfilled date:{" "}
                      {analytics.fulfillments.map((fulfillment) => {
                        return `
                            key=${fulfillment.id}
                              date: ${fulfillment.created_at}`;
                      })}
                    </p>
                    Addresses:{" "}
                    {analytics.line_items.map((line_items) => {
                      return `
                            quantity=${line_items.quantity}
                            sku=${line_items.sku}
                              `;
                    })}
                    <p>details: {JSON.stringify(analytics, null, 2)}</p>
                  </li>
                ))
              ) : (
                <p>no analytics data available</p>
              )}
            </li> */}

            <Grid container spacing={2}>
              {result_array.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <SalesCard sku={item.sku} data={item.data} />
                </Grid>
              ))}
            </Grid>

            {/* <li>
              {Array.isArray(result_array) && result_array.length > 0 ? (
                result_array.map((analytics) => (
                  <li key={analytics.sku}>
                    <p>SKU : {analytics.sku}</p>
                    <p> 
                      {analytics.data.map((analytic) => {
                        return `
                            date=${analytic.date}
                              quantity: ${analytic.quantity}`;
                      })}
                    </p>
                    
                    
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

export default SKU_prediction;
