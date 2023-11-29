

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
  
  var API_LINK = "http://191.101.233.66:5000/";
  var total_orders_count = 0;
  
  function Analytics2() {
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
  
  export default Analytics2;
  



  //-----------------------------------------NEW ANALYTICS----------------------------------------------------------


  
  function Analytics(props) {
    const [analytics_options, set_analytics_options] = useState("");
    const [orders_count, set_orders_count] = useState("");
    const [total_sales, set_total_sales] = useState("");
    const [responseData_analytics, setresponseData_analytics] = useState([]);
    const [page_options, set_page_options] = useState("");
    const [topProducts, setTopProducts] = useState([]);
    const [allProducts, setallProducts] = useState([]);
    const [pos_allProducts, set_pos_allProducts] = useState([]);
    const [perDaySales, setPerDaySales] = useState({});
    const [loading, setLoading] = useState(true); // State to track loading
    const [refresh, set_refresh] = useState(false); // State to track loading
  
    var productDetails = {};
    var orderDetails = {};
    var perDaySalesData = {};
  
    var shopify_data = props.shopify_data;
    var user_company = props.user_company;
  
    const user = auth.currentUser;
    var email = "";
    const company2 = useSelector((state) => state.users);
  
    console.log("showing company2 in analytics", company2[0]);
    console.log("showing user-company in analytics", user_company);
    console.log("showing shopify_data in analytics", shopify_data);
  
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
  
    function get_total_sales() {
      set_analytics_options("get_total_sales");
      // handle_get_cust_data();
      // handle_total_sales();
      set_page_options("get_total_sales");
  
      console.log("iam in get_total_sales ");
    }
  
    // const handle_refresh = () => {
    //   set_refresh(true);
    //   handle_total_sales();
    //   console.log("into handle refresh");
    // };
  
    // const sorting_function = (sales_data) => {
    //   console.log("sales_data",sales_data);
  
    //   if (sales_data) {
    //     const sorted = sales_data
    //       .slice()
    //       .sort((a, b) => b.orders_count - a.orders_count);
  
    // const emailAndTitleArray = sorted.map((row) => ({
    //   id: row.id,
    //   email: row.email || "", // Replace null with ""
    //   name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
    //   phone: row.addresses
    //     .map((addresses) => addresses.phone || "")
    //     .join(", "), // Replace null with "" and join the values
    //   addresses: row.addresses.map((addresses) => {
    //     return `${addresses.address1 || ""}, ${addresses.city || ""}, ${
    //       addresses.country || ""
    //     }`;
    //   }),
    // }));
  
    //     console.log("Email and Title Array:", emailAndTitleArray);
    //     setSortedCustomers(emailAndTitleArray);
    //   }
    // };
  
    const handle_total_sales = async () => {
      // setresponseData_analytics("");
  
      try {
        let shops_combined = [];
        console.log("in try 1");
  
        if (user) {
          email = user.email;
          console.log("in try 2");
  
          if (company2) {
            const filteredCompanies = company2.filter(
              (company) => company.email === email
            );
            console.log("filtered companies", filteredCompanies[0]);
            const requestData = {
              company: filteredCompanies[0].company,
            };
  
            const response = await axios.post(
              API_LINK + "get_shopify_warehouse_By_company",
              requestData
            );
            console.log(
              "get_shopify_warehouse_By_company data  :: ",
              response.data
            );
            const shopify_warehouses = response.data;
  
            try {
              const totalOrdersPromises = shopify_warehouses.map(
                async (shopifyStore) => {
                  const analyticsRequestData = {
                    store_name: shopifyStore.store_name,
                    api_key: shopifyStore.api_key,
                    token_pass: shopifyStore.token_pass,
                  };
                  console.log(
                    "showing analytics request data 2",
                    analyticsRequestData
                  );
  
                  const response = await axios.post(
                    API_LINK + "get_analytics/total_orders",
                    analyticsRequestData
                  );
                  console.log(
                    "analytics data sent from backend :: ",
                    response.data.orders
                  );
                  set_refresh(false);
                  shops_combined = [...shops_combined, ...response.data.orders];
                  shops_combined = Array.from(new Set(shops_combined));
                  console.log("showing shops_combined", shops_combined);
  
                  setresponseData_analytics(shops_combined);
  
                  orderDetails = shops_combined;
  
                  // var quantity_final = 0;
  
                  // shops_combined.forEach((order) => {
                  //   order.line_items.forEach((item) => {
                  //     const title = item.title;
                  //     const created_at = order.created_at;
                  //     const quantity_item = parseFloat(item.quantity);
                  //     console.log("title :", title);
                  //     console.log("created_at :", created_at);
                  //     console.log("quantity_item :", quantity_item);
                  //     if (title === "jacket"){
                  //       quantity_final += quantity_item;
                  //     }
                  //   });
                  //   console.log("final quantity of jacket :", quantity_final);
                  // });
                  // orderDetails = response.data.orders;
  
                  // setresponseData_analytics((prevData) => [
                  //   ...prevData,
                  //   ...response.data.orders,
                  // ]);
                }
              );
              // console.log("showing totalOrdersPromises", totalOrdersPromises);
  
              // calculate_sales(response.data.orders);
              // calculate_sales(shops_combined);
              // handle_total_orders_count();
              // console.log("showing handle total sales 2", shops_combined);
  
              // // console.log("showing handle total sales ", responseData_analytics);
              // // handle_top_products(response.data.orders);
              // handle_top_products(shops_combined);
              // orderDetails = response.data.orders;
              // sorting_function(); // Move this line to after setting the state
            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle the error
            }
          }
        }
      } catch (error) {
        console.log("error in handle total sales", error);
      }
    };
  
    async function handle_total_orders_count() {
      console.log(
        "responseData_analytics in handle_total_orders_count",
        responseData_analytics
      );
  
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
      console.log(
        "responseData_analytics in calculate_sales",
        responseData_analytics
      );
      let total = 0;
      // for (const order of orders) {
      for (const order of responseData_analytics) {
        const amount = parseFloat(order.total_price_set.shop_money.amount); // Parse the amount as a float
        console.log("amount ", amount);
        total += amount; // Add the amount to the totalSales variable
      }
      set_total_sales(total);
    };
  
    const handle_pos_data = async (perDaySalesData) => {
      let val1 = [];
      let val2 = [];
      var perDaySales_new = {};
      console.log("in handle_pos_data", perDaySalesData);
  
      const requestData = {
        company: user_company,
      };
      try {
        const response = await axios.post(
          API_LINK + "pos_stock_details",
          requestData
        );
        console.log("pos stock details data 1:: ", response.data[0]);
        val1 = response.data[0];
      } catch (error) {
        console.log("error in handle pos data", error);
      }
      if (user) {
        email = user.email;
        const requestData2 = {
          email: email,
        };
        try {
          const response2 = await axios.post(
            API_LINK + "get_company_products",
            requestData2
          );
          val2 = response2.data[0];
          console.log("pos stock details data 2:: ", response2.data[0]);
        } catch (error) {
          console.log("error in handle pos data", error);
        }
      }
  
      //-------------------------------------------------------------------------------------------------
  
      // POS data processing for All products
  
      // Create a map to match val2 items by their barcode
      if (val2.length > 0) {
        console.log("val2", val2);
        const val2Map = new Map();
        val2.forEach((item) => {
          val2Map.set(item.barcode, item);
        });
  
        // Initialize the resulting array
        const all_product_result = [];
  
        val1.forEach((item1) => {
          const created_at = item1.date.split("T")[0]; // Extract the date part
          const line_items = [];
  
          // Split the description in val1 to get individual items
          const items = item1.description.slice(0, -1).split(",");
          items.forEach((item) => {
            const [barcode, quantity] = item.match(/(\w+)\((\d+)\)/).slice(1);
            const val2Item = val2Map.get(barcode);
            if (val2Item) {
              line_items.push({
                title: val2Item.title,
                quantity: parseInt(quantity),
              });
            }
          });
  
          all_product_result.push({
            created_at,
            line_items,
          });
        });
        console.log("all_product_result", all_product_result);
  
  
        // Now, let's group the all_product_result by title and date
        const groupedResult = {};
        all_product_result.forEach((item) => {
          item.line_items.forEach((lineItem) => {
            const title = lineItem.title;
            const date = item.created_at;
  
            if (!groupedResult[title]) {
              groupedResult[title] = {
                created_at: [],
                line_items: [],
                title: title,
                quantity: 0,
              };
            }
  
            const index = groupedResult[title].created_at.indexOf(date);
            if (index === -1) {
              groupedResult[title].created_at.push(date);
              groupedResult[title].line_items.push(lineItem);
              groupedResult[title].quantity += lineItem.quantity;
            } else {
              groupedResult[title].line_items[index].quantity +=
                lineItem.quantity;
              groupedResult[title].quantity += lineItem.quantity;
            }
          });
        });
  
        const finalResult = Object.values(groupedResult);
  
        console.log("finalResult", finalResult);
        set_pos_allProducts(finalResult);
        // console.log("all_product_result",all_product_result);
  
        //-------------------------------------------------------------------------------------------------
  
        // POS data processing for sales per day chart
  
        const result = [];
  
        val2.forEach((skuObj) => {
          const title = skuObj.SKU;
          const data = [];
          let total = 0;
  
          val1.forEach((posObj) => {
            const barcodeQuantityPairs = posObj.description
              .split(",")
              .map((pair) => pair.split("("));
            const quantity = barcodeQuantityPairs
              .filter(([barcode]) => barcode === skuObj.barcode)
              .reduce((total, [, qty]) => total + parseInt(qty), 0);
  
            const retailPrice = parseFloat(skuObj.retail_price.replace(",", "")); // Parse retail_price as a float
  
            const dateParts = posObj.date.split("T"); // Split the string at the 'T'
            const extractedDate = dateParts[0];
            total += parseInt((quantity * retailPrice).toFixed(2));
  
            if (perDaySales_new[extractedDate]) {
              perDaySales_new[extractedDate] += parseInt(
                (quantity * retailPrice).toFixed(2)
              );
            } else {
              perDaySales_new[extractedDate] = parseInt(
                (quantity * retailPrice).toFixed(2)
              );
            }
  
            data.push({
              quantity,
              date: extractedDate,
              price: (quantity * retailPrice).toFixed(2), // Calculate the price
            });
          });
  
          result.push({ title, data, total });
        });
        if (perDaySalesData) {
          console.log(
            "showing combined data in analytics before ",
            perDaySales_new
          );
  
          for (const [date, value] of Object.entries(perDaySalesData)) {
            console.log(`Date: ${date}, Value: ${value}`);
            if (perDaySales_new[date]) {
              perDaySales_new[date] += parseInt(value.toFixed(2));
            } else {
              perDaySales_new[date] = parseInt(value.toFixed(2));
            }
            console.log("showing combined data in analytics 5", perDaySales);
          }
        }
  
        console.log("showing combined data in analytics 1", result);
        // console.log("showing combined data in analytics 5", perDaySales);
        // let total_sales_pos = perDaySales;
        // console.log("showing combined data in analytics 2 ", total_sales_pos);
        console.log("showing combined data in analytics after ", perDaySales_new);
        setPerDaySales(perDaySales_new);
        console.log(
          "showing combined data in analytics 4 ",
          responseData_analytics
        );
      }
    };
  
    async function handle_top_products(order_analytics) {
      console.log(
        "responseData_analytics in handle top product ",
        responseData_analytics
      );
  
      // console.log("iam in handle top producst ", responseData_analytics);
      // console.log("iam in handle top producst order_analytics ", order_analytics);
      // productDetails.length = 0;
  
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
      // console.log("showing producst_details ",productDetails)
      sort_product_details();
    }
  
    const sort_product_details = () => {
      if (productDetails) {
        console.log("showing top products 1122kkkqq ", productDetails);
      }
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
  
      console.log("showing pos_allProducts ", pos_allProducts);
      if (pos_allProducts.length > 0) {
        var new_order_analytics = [...productDetailsArray, ...pos_allProducts];
        new_order_analytics.sort((a, b) => b.quantity - a.quantity);
  
        console.log(
          "iam in handle top producst 1",
          new_order_analytics.slice(0, 10)
        );
      }
  
      productDetails = sortedProductDetails;
      //   for (const title in productDetails) {
      //     console.log(title);
      //   }
      setTopProducts(new_order_analytics.slice(0, 10));
      // sorting_function(productDetailsArray);
      setallProducts(new_order_analytics);
  
      // Now sortedProductDetails contains product details sorted by total quantity
      // console.log("showing sorted product array ", sortedProductDetails);
      // setTopProducts(productDetailsArray.slice(0, 10));
      // // sorting_function(productDetailsArray);
      // setallProducts(productDetailsArray);
      console.log("showing top products 1122kkk ", productDetailsArray);
      // console.log("showing top products ", topProducts);
      // console.log("showing All products ", sortedProductDetails);
  
      calculatePerDaySales();
    };
  
    const calculatePerDaySales = () => {
      var total_value = 0;
      // console.log("showing orderDetails", orderDetails);
      // console.log("showing orderDetails 2", responseData_analytics);
  
      if (responseData_analytics.length > 0) {
        // perDaySalesData = {}
        // perDaySalesData.length = 0
        responseData_analytics.forEach((order) => {
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
  
        console.log("showing perdaysales ", perDaySalesData);
        // sorting_function(perDaySales)
  
        // setPerDaySales(perDaySalesData);
        if (perDaySalesData) {
          handle_pos_data(perDaySalesData);
          setLoading(false);
        }
  
        console.log("showing per day sales value", perDaySalesData);
        console.log("showing total sales ", total_value);
      }
  
      // if (orderDetails.length > 0) {
      //   // perDaySalesData = {}
      //   // perDaySalesData.length = 0
      //   orderDetails.forEach((order) => {
      //     const date = new Date(order.created_at).toISOString().split("T")[0];
      //     var totalOrderValue = parseFloat(
      //       order.current_total_price_set.shop_money.amount
      //     );
  
      //     total_value += totalOrderValue;
  
      //     if (perDaySalesData[date]) {
      //       perDaySalesData[date] += totalOrderValue;
      //     } else {
      //       perDaySalesData[date] = totalOrderValue;
      //     }
      //   });
  
      //   console.log("showing perdaysales ", perDaySalesData);
  
      //   setPerDaySales(perDaySalesData);
      //   if (perDaySalesData) {
      //     setLoading(false);
      //   }
  
      //   console.log("showing per day sales value", perDaySalesData);
      //   console.log("showing total sales ", total_value);
      // }
    };
  
    useEffect(() => {
      handle_total_sales();
      if (perDaySales.length > 0) handle_pos_data();
      console.log("iam in use effect 1");
    }, []);
  
    
    useEffect(() => {
      console.log("responseData_analytics in useEffect:", responseData_analytics);
      if (responseData_analytics.length > 0) {
        calculate_sales(responseData_analytics);
        handle_total_orders_count();
        console.log("showing handle total sales 2", responseData_analytics);
  
        // console.log("showing handle total sales ", responseData_analytics);
        // handle_top_products(response.data.orders);
        handle_top_products(responseData_analytics);
      }
    }, [responseData_analytics]);
  
  
  
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
          {/* <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(45deg, #593993, #9319B5)",
              boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
              color: "white",
              width: "50%",
              borderRadius: "12px",
            }}
            onClick={handle_refresh}
          >
            Refresh
          </Button>
          <h1>Analaytics</h1> */}
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
  

  //------------------------- Updated correct Analytics -------------------------------------------


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
  import firebase_app from "../Firebase/firebase";
  import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import ApexChart from "../Charts/Product_stat";
  import ApexChart_2 from "../Charts/Sales_per_day";
  import Sales_per_day from "../Charts/Sales_per_day";
  import Product_stat from "../Charts/Product_stat";
  
  import MITS_gif from "../images/MITS_Logo.gif";
  import { useSelector } from "react-redux";
  
  const auth = getAuth(firebase_app);
  
  var API_LINK = "http://191.101.233.66:5000/";
  var total_orders_count = 0;
  
  function Analytics(props) {
    const [analytics_options, set_analytics_options] = useState("");
    const [orders_count, set_orders_count] = useState("");
    const [total_sales, set_total_sales] = useState("");
    const [responseData_analytics, setresponseData_analytics] = useState([]);
    const [page_options, set_page_options] = useState("");
    const [topProducts, setTopProducts] = useState([]);
    const [allProducts, setallProducts] = useState([]);
    const [pos_allProducts, set_pos_allProducts] = useState([]);
    const [perDaySales, setPerDaySales] = useState({});
    const [loading, setLoading] = useState(true); // State to track loading
    const [refresh, set_refresh] = useState(false); // State to track loading
  
    var productDetails = {};
    var orderDetails = {};
    var perDaySalesData = {};
  
    var shopify_data = props.shopify_data;
    var user_company = props.user_company;
  
    const user = auth.currentUser;
    var email = "";
    const company2 = useSelector((state) => state.users);
  
    console.log("showing company2 in analytics", company2[0]);
    console.log("showing user-company in analytics", user_company);
    console.log("showing shopify_data in analytics", shopify_data);
  
    // Simulate loading perDaySales data
  
    function get_total_sales() {
      set_analytics_options("get_total_sales");

      set_page_options("get_total_sales");
  
      console.log("iam in get_total_sales ");
    }
  
    const handle_total_sales = async () => {
  
      try {
        let shops_combined = [];
        console.log("in try 1");
  
        if (user) {
          email = user.email;
          console.log("in try 2");
  
          if (company2) {
            const filteredCompanies = company2.filter(
              (company) => company.email === email
            );
            console.log("filtered companies", filteredCompanies[0]);
            const requestData = {
              company: filteredCompanies[0].company,
            };
  
            const response = await axios.post(
              API_LINK + "get_shopify_warehouse_By_company",
              requestData
            );
            console.log(
              "get_shopify_warehouse_By_company data  :: ",
              response.data
            );
            const shopify_warehouses = response.data;
            if (shopify_warehouses.length > 0) {
              try {
                const totalOrdersPromises = shopify_warehouses.map(
                  async (shopifyStore) => {
                    const analyticsRequestData = {
                      store_name: shopifyStore.store_name,
                      api_key: shopifyStore.api_key,
                      token_pass: shopifyStore.token_pass,
                    };
                    console.log(
                      "showing analytics request data 2",
                      analyticsRequestData
                    );
  
                    const response = await axios.post(
                      API_LINK + "get_analytics/total_orders",
                      analyticsRequestData
                    );
                    console.log(
                      "analytics data sent from backend :: ",
                      response.data.orders
                    );
                    set_refresh(false);
                    shops_combined = [...shops_combined, ...response.data.orders];
                    shops_combined = Array.from(new Set(shops_combined));
                    console.log("showing shops_combined", shops_combined);
  
                    setresponseData_analytics(shops_combined);
                    
  
                    orderDetails = shops_combined;
  
                    let sales_data = calculatePerDaySales();
                    let finalResult = await handle_pos_data(sales_data);
                    handle_top_products(shops_combined, finalResult);
                  }
                );
              } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error
              }
            } else {
              let sales_data = {};
              handle_pos_data(sales_data);
            }
          }
        }
      } catch (error) {
        console.log("error in handle total sales", error);
      }
    };
  
    async function handle_total_orders_count() {
      console.log(
        "responseData_analytics in handle_total_orders_count",
        responseData_analytics
      );
  
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
      console.log(
        "responseData_analytics in calculate_sales",
        responseData_analytics
      );
      let total = 0;
      // for (const order of orders) {
      for (const order of responseData_analytics) {
        const amount = parseFloat(order.total_price_set.shop_money.amount); // Parse the amount as a float
        console.log("amount ", amount);
        total += amount; // Add the amount to the totalSales variable
      }
      set_total_sales(total);
    };
  
    const handle_pos_data = async (salesData) => {
      let val1 = [];
      let val2 = [];
      var perDaySales_new = {};
      console.log("in handle_pos_data", salesData);
  
      const requestData = {
        company: user_company,
      };
      try {
        const response = await axios.post(
          API_LINK + "pos_stock_details",
          requestData
        );
        console.log("pos stock details data 1:: ", response.data[0]);
        val1 = response.data[0];
      } catch (error) {
        console.log("error in handle pos data", error);
      }
      if (user) {
        email = user.email;
        const requestData2 = {
          email: email,
        };
        try {
          const response2 = await axios.post(
            API_LINK + "get_company_products",
            requestData2
          );
          val2 = response2.data[0];
          console.log("pos stock details data 2:: ", response2.data[0]);
        } catch (error) {
          console.log("error in handle pos data", error);
        }
      }
  
      //-------------------------------------------------------------------------------------------------
  
      // POS data processing for All products
  
      // Create a map to match val2 items by their barcode
      if (val2.length > 0 && val1.length > 0) {
        console.log("val2", val2);
        const val2Map = new Map();
        val2.forEach((item) => {
          val2Map.set(item.barcode, item);
        });
  
        // Initialize the resulting array
        const all_product_result = [];
  
        val1.forEach((item1) => {
          const created_at = item1.date.split("T")[0]; // Extract the date part
          const line_items = [];
  
          // Split the description in val1 to get individual items
          if (item1.description != null) {
            console.log("item1.description", item1.description);
            const items = item1.description.slice(0, -1).split(",");
            items.forEach((item) => {
              const [barcode, quantity] = item.match(/(\w+)\((\d+)\)/).slice(1);
              const val2Item = val2Map.get(barcode);
              if (val2Item) {
                line_items.push({
                  title: val2Item.title,
                  quantity: parseInt(quantity),
                  price: item.cost_price,
                });
              }
            });
  
            all_product_result.push({
              created_at,
              line_items,
            });
          }
        });
  
        console.log("all_product_result", all_product_result);
  
        // Now, let's group the all_product_result by title and date
        const groupedResult = {};
        all_product_result.forEach((item) => {
          item.line_items.forEach((lineItem) => {
            const title = lineItem.title;
            const date = item.created_at;
  
            if (!groupedResult[title]) {
              groupedResult[title] = {
                created_at: [],
                line_items: [],
                title: title,
                quantity: 0,
              };
            }
  
            const index = groupedResult[title].created_at.indexOf(date);
            if (index === -1) {
              groupedResult[title].created_at.push(date);
              groupedResult[title].line_items.push(lineItem);
              groupedResult[title].quantity += lineItem.quantity;
            } else {
              groupedResult[title].line_items[index].quantity +=
                lineItem.quantity;
              groupedResult[title].quantity += lineItem.quantity;
            }
          });
        });
  
        const finalResult = Object.values(groupedResult);
  
        console.log("finalResult", finalResult);
        set_pos_allProducts(finalResult);
        // console.log("all_product_result",all_product_result);
  
        //-------------------------------------------------------------------------------------------------
  
        // POS data processing for sales per day chart
  
        const result = [];
  
        val2.forEach((skuObj) => {
          const title = skuObj.SKU;
          const data = [];
          let total = 0;
  
          val1.forEach((posObj) => {
            const barcodeQuantityPairs = posObj.description
              .split(",")
              .map((pair) => pair.split("("));
            const quantity = barcodeQuantityPairs
              .filter(([barcode]) => barcode === skuObj.barcode)
              .reduce((total, [, qty]) => total + parseInt(qty), 0);
  
            const retailPrice = parseFloat(skuObj.retail_price.replace(",", "")); // Parse retail_price as a float
  
            const dateParts = posObj.date.split("T"); // Split the string at the 'T'
            const extractedDate = dateParts[0];
            total += parseInt((quantity * retailPrice).toFixed(2));
  
            if (perDaySales_new[extractedDate]) {
              perDaySales_new[extractedDate] += parseInt(
                (quantity * retailPrice).toFixed(2)
              );
            } else {
              perDaySales_new[extractedDate] = parseInt(
                (quantity * retailPrice).toFixed(2)
              );
            }
  
            data.push({
              quantity,
              date: extractedDate,
              price: (quantity * retailPrice).toFixed(2), // Calculate the price
            });
          });
  
          result.push({ title, data, total });
        });
  
        if (salesData) {
          console.log(
            "showing combined data in analytics before ",
            perDaySales_new
          );
  
          for (const [date, value] of Object.entries(salesData)) {
            console.log(`Date: ${date}, Value: ${value}`);
            if (perDaySales_new[date]) {
              perDaySales_new[date] += parseInt(value.toFixed(2));
            } else {
              perDaySales_new[date] = parseInt(value.toFixed(2));
            }
            console.log("showing combined data in analytics 5", perDaySales);
          }
        }
  
        console.log("showing combined data in analytics 1", result);
        console.log("showing combined data in analytics after ", perDaySales_new);
        setPerDaySales(perDaySales_new);
  
        return finalResult;
      } else {
        let dummy_val = { "2000-1-10": 0 };
        setPerDaySales(dummy_val);
      }
    };
  
    async function handle_top_products(order_analytics, finalResult) {
      console.log(
        "responseData_analytics in handle top product ",
        responseData_analytics
      );
  
      if (order_analytics) {
        console.log("iam in handle top producst 2");
  
        await order_analytics.forEach((order) => {
          var quantity_final = 0;
          order.line_items.forEach((item) => {
            const title = item.title;
            const created_at = order.created_at;
            const quantity_item = parseFloat(item.quantity);
  
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
      console.log("showing productDetails ", productDetails);
      sort_product_details(productDetails, finalResult);
    }
  
    const sort_product_details = (details_product, finalResult) => {
      if (details_product) {
        console.log("showing top products 1122kkkqq ", details_product);
      }
      const productDetailsArray = Object.entries(details_product).map(
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
      console.log("showing productDetailsArray ", productDetailsArray);
      // Convert the sorted array back into an object
      const sortedProductDetails = productDetailsArray.reduce((acc, item) => {
        acc[item.title] = {
          line_items: item.line_items,
          created_at: item.created_at,
          quantity: item.quantity,
        };
        return acc;
      }, {});
      console.log("showing sortedProductDetails", sortedProductDetails);
  
      console.log("showing pos_allProducts ", pos_allProducts);
      console.log("showing pos_allProducts finalResult ", finalResult);
      
      if (finalResult.length > 0) {
        var new_order_analytics = [...productDetailsArray, ...finalResult];
        new_order_analytics.sort((a, b) => b.quantity - a.quantity);
  
        if (new_order_analytics.length > 0) {
          console.log(
            "iam in handle top producst 1",
            new_order_analytics.slice(0, 10)
          );
        }
  
        console.log("showing new_order_analytics ", new_order_analytics);
  
        productDetails = sortedProductDetails;
        setTopProducts(new_order_analytics.slice(0, 10));
        setallProducts(new_order_analytics);
      }
      console.log("showing top products 1122kkk ", productDetailsArray);
    };
  
    const calculatePerDaySales = () => {
      var total_value = 0;
      console.log("showing orderDetails", orderDetails);
  
      if (orderDetails.length > 0) {
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
  
        console.log("showing perdaysales ", perDaySalesData);
        if (perDaySalesData) {
          setLoading(false);
        }
  
        console.log("showing per day sales value", perDaySalesData);
        console.log("showing total sales ", total_value);
        return perDaySalesData;
      }
    };
  
    useEffect(() => {
      handle_total_sales();
      console.log("iam in use effect 1");
    }, []);
  
    useEffect(() => {
      console.log("responseData_analytics in useEffect:", responseData_analytics);
      if (responseData_analytics.length > 0) {
        handle_total_orders_count();
        console.log("showing handle total sales 2", responseData_analytics);
      }
    }, [responseData_analytics]);

  
    return (
      <div>
        <Container>  
          <div>
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
  

                  </Grid>
                </Grid>
              )}
 
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  export default Analytics;
  