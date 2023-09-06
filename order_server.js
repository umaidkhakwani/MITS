const express = require("express");
const request = require("request");
const cors = require("cors");
const connection = require("./Database/db");
const userModel = require("./Database/userModel");
const warehouse_model = require("./controller/Warehouse_controller");
const warehouse_products = require("./controller/Warehouse_product_controller");
const warehouse_products_details = require("./controller/Warehouse_product_details");
const transfer_quantity = require("./controller/Transfer")

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
const { default: Warehouse } = require("./frontend/src/components/Warehouse");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.port || 5000;

const shopify_api_key = "169f5d9abebdf0dfac8ddad34aa6c5bd";
const shopify_token_pass = "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";
const endpoint = "products";
const product_id = "8540355002668";
const store = "dummy-test-store-001";

//----------------------------  USER REGISTRATION -------------------------------------------------------------------

userModel.createUserTable();

// Registration route
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  let userToken = 0;
  // Insert new user
  const newUser = { fname, lname, email, password, userToken };
  await userModel.insertUser(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

//----------------------------  Warehouse -------------------------------------------------------------------

warehouse_model.create_warehouse();
warehouse_products_details.create_warehouse_product_details();

// Registration route
app.post("/create_warehouse", async (req, res) => {
  const { email, title, address, city, country, association, date, time } =
    req.body.product;
  console.log(
    `inside create warehouse:: email is : ${email}, date is : ${date}, time is : ${time}, association is : ${association}`
  );

  console.log("showing request body ", req.body);
  let userToken = 0;
  // Insert new user
  try {
    const new_warehouse = {
      email,
      title,
      address,
      city,
      country,
      association,
      date,
      time,
    };
    await warehouse_model.insert_warehouse(new_warehouse);

    res.status(201).json({ message: "Warehouse created successfully" });
  } catch (error) {
    console.error("Error creating warehouse:", error);
    res.status(500).json({ message: "Error creating warehouse" });
  }
});

app.post("/get_warehouse", async (req, res) => {
  const { email } = req.body;
  console.log("showing email in get warehouse", email);
  try {
    const warehouse_list = await warehouse_model.getUserByEmail(email);
    console.log(warehouse_list[0]);

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

app.post("/get_warehouse_specified", async (req, res) => {
  const { email, title } = req.body;
  console.log("showing email in get warehouse", email);
  try {
    const warehouse_list = await warehouse_model.getUserByEmailandWarehouse(
      email,
      title
    );
    // console.log(warehouse_list[0]);

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

app.post("/get_warehouse_store", async (req, res) => {
  const { email, association } = req.body;
  console.log("showing email in get warehouse", email);
  try {
    const warehouse_list = await warehouse_model.getUserByEmailandStore(
      email,
      association
    );
    console.log("showing warehouse in warehouse store ",warehouse_list[0]);

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

//----------------------------  Warehouse Products -------------------------------------------------------------------


warehouse_products.create_warehouse_product();

// Registration route
app.post("/create_warehouse_products", async (req, res) => {
  const {
    email,
    warehouse,
    title,
    description,
    picture_url,
    cost_price,
    retail_price,
    quantity,
    SKU,
    barcode,
    weight,
    size,
    color,
  } = req.body.product;
  console.log("inside create warehouse", email);

  console.log("showing request body  create warehouse", req.body);
  let userToken = 0;

  const new_warehouse_products = {
    email,
    warehouse,
    title,
    description,
    picture_url,
    cost_price,
    retail_price,
    quantity,
    SKU,
    barcode,
    weight,
    size,
    color,
  };
  console.log("showing new_warehouse_products ::", new_warehouse_products);
  try {
    await warehouse_products.insert_warehouse_product(new_warehouse_products);

    res.status(201).json({ message: "warehouse product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/get_warehouse_products", async (req, res) => {
  const { email, warehouse } = req.body;
  console.log("showing req body  in get warehouse products", req.body);

  console.log("showing email in warehouse products", email);
  console.log("showing warehouse in get warehouse products", warehouse);
  try {
    const warehouse_list = await warehouse_products.getUserByEmailandWarehouse(
      email,
      warehouse
    );
    console.log("showing warehouse listttt::", warehouse_list);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

app.post("/get_all_warehouse_products", async (req, res) => {
  const { email } = req.body;
  console.log("showing req body  in get warehouse products", req.body);

  console.log("showing email in warehouse products", email);
  try {
    const warehouse_list = await warehouse_products.getUserByEmail(email);
    console.log("showing warehouse listttt::", warehouse_list);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

//----------------------------  TRANSFER STOCK -------------------------------------------------------------------

app.post("/transfer_quantity", async (req, res) => {
  const { email, sku, from_warehouse, to_warehouse, quantity } = req.body.transfer[0];
  console.log(`showing req body in transfer_quantity ${email}, ${sku}, ${from_warehouse}, ${to_warehouse}, ${quantity} `);
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const response = await transfer_quantity.transfer_quantity(email, from_warehouse, quantity,sku,to_warehouse);
    console.log("showing response ::", response);

    // Send the warehouse list in the response
    res.send("Successfully transferred");
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

//----------------------------  ORDERS -------------------------------------------------------------------

app.get("/getdata", (req, res) => {
  const get_prod_modified = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}.json
    `,
    headers: {
      "Content-type": "application/json",
    },
  };
  request(get_prod_modified, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    // console.log(response.body);
  });
});

app.get("/get_all_orders", (req, res) => {
  const get_all_orders = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/orders.json?status=any
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  request(get_all_orders, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    // console.log(formattedData);
  });
});


app.get("/get_orders", (req, res) => {
  const get_orders = {
    method: "GET",
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/orders.json
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  request(get_orders, function (error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    // console.log(formattedData);
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
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}.json
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
  console.log(
    "showing req.body create product shopify ::   ",
    productCreateData
  );
  const createProdModified = {
    method: "POST",
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/${endpoint}.json
        `,
    headers: {
      "Content-type": "application/json",
    },
    // ...createProd,
    body: JSON.stringify({
      //   product: productCreateData,
      product: {
        title: productCreateData.title,
        vendor: store,
        body_html: "<p>" + productCreateData.description + "</p>",
        handle: productCreateData.title,
        // product_type: productCreateData.product_type,
        variants: [
          {
            title: productCreateData.size + " / " + productCreateData.color,
            price: productCreateData.price,
            sku: productCreateData.sku,
            inventory_management: "shopify",
            option1: productCreateData.size,
            option2: productCreateData.color,
            weight: productCreateData.weight,
            weight_unit: "kg",
            inventory_quantity: productCreateData.quantity,
          },
        ],
        options: [
          {
            name: "Size",
            position: 1,
            values: [productCreateData.size],
          },
          {
            name: "Color",
            position: 2,
            values: [productCreateData.color],
          },
        ],
        image: productCreateData.picture_url,
      },
    }),
  };

  console.log("showing createProdModified ::   ", createProdModified.body);

  request(createProdModified, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    // console.log(response.body);
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
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/customers.json
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
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/orders.json?status=any
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
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/orders/count.json?status=any
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
    url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/sales_by_product.json
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
