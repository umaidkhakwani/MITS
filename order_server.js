const express = require("express");
const request = require("request");
const cors = require("cors");
const connection = require('./Database/db');
const userModel = require('./Database/userModel');
const shopify = require("shopify-api-node");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
} = require("./controller/Orders_controller");

const {
  createProd,
  getProd,
  updateProd,
  deleteProd,
} = require("./controller/Products_controller");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.port || 5000;

const shopify_api_key = "169f5d9abebdf0dfac8ddad34aa6c5bd";
const shopify_token_pass = "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";
const endpoint = "products";
const product_id = "8540355002668";


//----------------------------  USER REGISTRATION -------------------------------------------------------------------

userModel.createUserTable();

// Registration route
app.post('/register', async (req, res) => {
  const { fname, lname , email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  let userToken = 0;
  // Insert new user
  const newUser = { fname, lname , email, password, userToken };
  await userModel.insertUser(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});


//----------------------------  ORDERS -------------------------------------------------------------------

app.get("/get_orders", (req, res) => {
  request(getOrders, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    console.log(formattedData);
  });
});

app.get("/create_order", (req, res) => {
  request(createOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    console.log(response.body);
  });
});

app.get("/update_order", (req, res) => {
  request(updateOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    console.log(response.body);
  });
});

app.get("/cancel_order", (req, res) => {
  request(cancelOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send("Successfully Cancelled");
    console.log(response.body);
  });
});

app.get("/delete_order", (req, res) => {
  request(deleteOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send("successfully deleted");
    console.log(response.body);
  });
});

//----------------------------  PRODUCTS -------------------------------------------------------------------

app.get("/getdata", (req, res) => {
  const get_prod_modified = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}.json
    `,
    headers: {
      "Content-type": "application/json",
    },
  };
  request(get_prod_modified, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    console.log(response.body);
  });
});

app.post("/create_product", (req, res) => {
  console.log(req.stringify);
  const productCreateData = req.body.product;
  console.log("showing req.body ::   ", productCreateData);
  const createProdModified = {
    method: "POST",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/${endpoint}.json
        `,
    headers: {
      "Content-type": "application/json",
    },
    // ...createProd,
    body: JSON.stringify({
      //   product: productCreateData,
      product: {
        title: productCreateData.title,
        vendor: productCreateData.vendor,
        body_html: "<p>" + productCreateData.description + "</p>",
        handle: productCreateData.title,
        product_type: productCreateData.product_type,
        vendor: productCreateData.vendor,
        variants: [
          {
            price: productCreateData.price,
            sku: productCreateData.sku,
            inventory_quantity: productCreateData.quantity,
          },
        ],
      },
    }),
  };

  console.log("showing createProdModified ::   ", createProdModified.body);

  request(createProdModified, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    console.log(response.body);
  });
});

app.get("/update_product", (req, res) => {
  request(updateProd, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    console.log(response.body);
  });
});

app.get("/delete_product", (req, res) => {
  request(deleteProd, function (error, response) {
    if (error) throw new Error(error);
    res.send("successfully deleted");
    console.log(response.body);
  });
});

//----------------------------  CUSTOMERS -------------------------------------------------------------------

app.get("/get_customers", (req, res) => {
  let get_cus = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/customers.json
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  request(get_cus, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    console.log(formattedData);
  });
});

//----------------------------  ANALYTICS -------------------------------------------------------------------

app.get("/get_analytics/total_orders", (req, res) => {
  let get_analytics = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/orders.json?status=any
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  request(get_analytics, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    console.log(formattedData);
  });
});

app.get("/get_analytics/total_orders_count", (req, res) => {
  let get_analytics = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/orders/count.json?status=any
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  request(get_analytics, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    console.log(formattedData);
  });
});

app.get("/get_analytics/top_products", (req, res) => {
  let get_analytics = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@dummy-test-store-001.myshopify.com/admin/api/2023-07/sales_by_product.json
    `,
    headers: {
      "Content-type": "application/json",
    },
    start_date: "2023-08-01",
    end_date: "2023-08-13",
  };

  request(get_analytics, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    console.log(formattedData);
  });
});

app.listen(PORT, () => console.log(`listening on: ${PORT}`));

//----------------------------CREATING WEBHOOKS-------------------------------------------------------

// const createWebhook = async (shopifyApiKey, shopifyTokenPass, apiVersion, storeName, topic) => {
//   const shopifyClient = shopify({
//     apiKey: shopifyApiKey,
//     password: shopifyTokenPass,
//     apiVersion: apiVersion,
//     shopName: storeName,
//   });

//   const webhook = {
//     topic: topic,
//     url: 'https://8202-110-39-21-154.ngrok-free.app/shopify-webhook-request',
//   };

//   const response = await shopifyClient.webhooks.create(webhook);

//   if (response.errors) {
//     console.error(response.errors);
//   } else {
//     console.log('Webhook created successfully');
//   }
// };

// createWebhook(
//     shopify_api_key,
//     shopify_token_pass,
//     api_version,
//     'dummy-test-store-001',
//     'orders/create',
// );

//-----------------------------------------------------------------------------------------------

// app.post("/shopify-webhook-request", (req, res) => {
//     const data = req;
//     console.log('data:', data);
//     res.send(data)
// });
