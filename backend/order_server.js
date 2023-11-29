const express = require("express");
const request = require("request");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const connection = require("./Database/db");
const userModel = require("./Database/userModel");
const warehouse_model = require("./controller/Warehouse_controller");
const warehouse_products = require("./controller/Warehouse_product_controller");
const warehouse_products_details = require("./controller/Warehouse_product_details");
const transfer_quantity = require("./controller/Transfer");
const warehouse_counter = require("./controller/Warehouse_counter");
const supplier_model = require("./controller/Suppliers_controller");
const pos_closing = require("./controller/POS_closing_controller");
const pos_expenses = require("./controller/Expenses_controller");
const pos_customers = require("./controller/Customer_controller");
const return_controller = require("./controller/Return_controller");
const status_model = require("./controller/Status_controller");
const shopify_pos = require("./controller/Shopify_warehouse_controller");

const shopify = require("shopify-api-node");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
} = require("./controller/Orders_controller");

// const {
//   createProd,
//   getProd,
//   updateProd,
//   deleteProd,
// } = require("./controller/Products_controller");
// const { default: Warehouse } = require("./frontend/src/components/Warehouse");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.port || 5000;

const shopify_api_key = "8deb91f0ff4f16a37ba275db50dc4121";
const shopify_token_pass = "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";
const endpoint = "products";
const product_id = "8540355002668";
const store = "nexos-9102";

// Nexos shopify warehouse
// Bahria Town
// Lahore
// Pakistan

app.use(bodyParser.json());

//----------------------------  USER REGISTRATION -------------------------------------------------------------------

userModel.createUserTable();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Registration route
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, company, userToken } = req.body;

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  // let userToken = 0;
  // Insert new user
  const newUser = { fname, lname, email, password, company, userToken };
  await userModel.insertUser(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/getUsers_by_Company", async (req, res) => {
  const { company } = req.body;

  // console.log("showing request in get user", req.body);

  // console.log("showing company in get user", company);
  // console.log("showing req body in get user", req.body);

  // Check if user already exists
  const existingUser = await userModel.getUserByCompany(company);
  // console.log("showing existing user ssss", existingUser);
  if (existingUser[0].length > 0) {
    // return res
    //   .status(409)
    //   .json({ message: "User with this email already exists" });
    // console.log("showing existing user", existingUser[0]);
    res.send(existingUser[0]);
  }
  // console.log("error fetching user");
});

// get user route
app.post("/get_user", async (req, res) => {
  const { email } = req.body;

  // console.log("showing email in get user", email);
  // // console.log("showing req body in get user", req.body);

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    // return res
    //   .status(409)
    //   .json({ message: "User with this email already exists" });
    // console.log("showing existing user", existingUser[0]);
    res.send(existingUser[0]);
  }
  // console.log("error fetching user");
});

app.post("/updateUser", async (req, res) => {
  const { fname, lname, email, password, company, userToken } = req.body;

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    const newUser = { fname, lname, email, password, company, userToken };
    await userModel.updateUser(newUser);

    res.status(201).json({ message: "User updated successfully" });
  } else {
    return res.status(409).json({ message: "User not found" });
  }
});

app.post("/updateAdminUser", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser[0].length > 0) {
    const newUser = { fname, lname, email, password };
    await userModel.updateAdminUser(newUser);

    res.status(201).json({ message: "User updated successfully" });
  } else {
    return res.status(409).json({ message: "User not found" });
  }
});

//----------------------------  Supplier -------------------------------------------------------------------

supplier_model.create_supplier();

// Create Supplier
app.post("/create_supplier", async (req, res) => {
  if (req.body.supplier) {
    const {
      name,
      email,
      phone_number,
      // company,
      category,
      city,
      address,
      country,
    } = req.body.supplier;
    // console.log(
    //   `inside create supplier:: email is : ${email}, phone_number is : ${phone_number}`
    // );
    // console.log("showing supplier request body ", req.body.supplier);
    let existingUser = "";
    let company = "";
    try {
      existingUser = await userModel.getUserByEmail(email);
      // console.log("showing existing user", existingUser[0][0].company);
      company = existingUser[0][0].company;
    } catch {
      // console.log("error fetching user in suppliers");
    }

    // Insert new user
    try {
      const new_supplier = {
        name,
        email,
        phone_number,
        company,
        category,
        city,
        address,
        country,
      };
      // // console.log("showing new supplier", new_supplier);
      await supplier_model.insert_supplier(new_supplier);

      res.send("suppllier created successfully");
    } catch (error) {
      console.error("Error creating suppllier:", error);
      // res.status(500).json({ message: "Error creating suppllier" });
    }
  }
});

//----------------------------  PREDICTION (SMART TOOLS) -------------------------------------------------------------------

app.post("/get_prediction", async (req, res) => {
  const { sku, data } = req.body;
  const dataArray = JSON.parse(data);
  console.log(
    `inside prediction:: sku is : ${sku}, dataArray is : ${JSON.stringify(
      dataArray
    )}`
  );
  // res.send("prediction done");

  const requestData = {
    sku,
    data: dataArray,
  };

  // Send a POST request to the Flask "/train" route
  axios
    .post("http://191.101.233.66:4000/train", requestData)
    .then((response) => {
      if (response.data.predictions) {
        console.log(
          "showing response in prediction",
          response.data.predictions
        );
        res.send(response.data.predictions);
      }
    })
    .catch((error) => {
      res.status(500).send("Error sending POST request to Flask");
    });
});

//----------------------------  Return Items -------------------------------------------------------------------
return_controller.create_return();

app.post("/create_return", async (req, res) => {
  const {
    email,
    SKU,
    barcode,
    title,
    warehouse,
    retail_price,
    quantity,
    discount_per,
    tax_per,
    date,
    time,
  } = req.body;

  let company = "";
  try {
    console.log("showing email in create_return", email);
    existingUser = await userModel.getUserByEmail(email);
    console.log(
      "showing existing user in get return_items", 
      existingUser[0][0].company
    );
    company = existingUser[0][0].company;
    try {
      const return_items = {
        email,
        SKU,
        barcode,
        title,
        warehouse,
        company,
        retail_price,
        quantity,
        discount_per,
        tax_per,
        date,
        time,
      };
      return_controller.insert_return(return_items);
    } catch (error) {
      return res.status(409).json({ message: "Error in inserting return" });
    }
    try {
       warehouse_products.add_inventory(email, warehouse, SKU, quantity)
      res.status(201).json({ message: "Return created successfully" });
    } catch (error) {
      return res.status(409).json({ message: "Inventory not updated in return controller" });
    }
  } catch {
    console.log("error fetching user in create_return");
  }
});


app.post("/get_return_data", async (req, res) => {
  const { email } = req.body;
  let company = "";
  try {
    existingUser = await userModel.getUserByEmail(email);
    company = existingUser[0][0].company;
    const all_returns = await return_controller.getUserByCompany(company);
    console.log(
      "showing all_returns in get_return_data",
      all_returns[0]
    );
    res.send(all_returns[0]);
  } catch (error) {
    console.error("Error in get_return_data:", error);
    res.status(500).json({
      message: "Error in get_return_data",
      error: error.message,
    });
  }
});

//--------------------------------------------------------------------------------------------------------------

//----------------------------  Status -------------------------------------------------------------------

status_model.create_status();

app.post("/get_status", async (req, res) => {
  const { email } = req.body;

  let company = "";
  try {
    existingUser = await userModel.getUserByEmail(email);
    console.log(
      "showing existing user in get status",
      existingUser[0][0].company
    );
    company = existingUser[0][0].company;
    const stats = await status_model.getUserByCompany(company);
    console.log("showing stats", stats[0]);
    if (stats[0].length > 0) {
      res.send(stats[0]);
    } else {
      res.status(500).send("Error sending status");
    }
  } catch {
    console.log("error fetching user in suppliers");
  }
});

app.post("/insert_status", async (req, res) => {
  const {
    email,
    warehouse,
    totalCostPrice,
    totalDiscount,
    totalRetail,
    time,
    date,
  } = req.body;
  const warehouse_details = await warehouse_model.getUserByEmailandWarehouse(
    email,
    warehouse
  );
  console.log("showing warehouse_details", warehouse_details);
  const { id, company } = warehouse_details[0][0];
  console.log(`inside POS CLOSING:: email is : ${id},  title is : ${company}`);

  const status = {
    email,
    warehouse,
    company,
    totalCostPrice,
    totalDiscount,
    totalRetail,
    time,
    date,
  };
  try {
    await status_model.insert_status(status);
    res.status(201).json({ message: "Status record inserted successfully" });
  } catch (error) {
    console.error("Error in Status record insert:", error);
    res.status(500).json({ message: "Error in Status record insert" });
  }
});

//--------------------------------------------------------------------------------------------------------

//----------------------------  POS CLOSING -------------------------------------------------------------------
warehouse_model.create_warehouse();
warehouse_products_details.create_warehouse_product_details();
pos_closing.create_pos_closing();
shopify_pos.create_shopify_warehouse();

app.post("/get_warehouse_id", async (req, res) => {
  const {
    email,
    title,
    description,
    gst,
    discount,
    cost_price,
    total_amount,
    user_paid,
    discount_price,
    transaction,
    time,
    date,
  } = req.body;
  console.log(`inside POS CLOSING:: email is : ${email},  title is : ${title}`);

  // Check if user already exists
  const warehouse_details = await warehouse_model.getUserByEmailandWarehouse(
    email,
    title
  );
  console.log("showing warehouse_details", warehouse_details);
  const { id, company } = warehouse_details[0][0];
  console.log(`inside POS CLOSING:: email is : ${id},  title is : ${company}`);

  const pos_closing_data = {
    id,
    description,
    gst,
    discount,
    company,
    total_amount,
    cost_price,
    user_paid,
    discount_price,
    transaction,
    time,
    date,
  };
  console.log("showing pos_closing_data", pos_closing_data);

  try {
    await pos_closing.insert_pos_closing(pos_closing_data);
    console.error("POS inserted successfully");
    res.status(201).json({ message: "POS inserted successfully" });
  } catch (error) {
    console.error("Error in POS insert:", error);
    res.status(500).json({ message: "Error in POS insert" });
  }

  // res.send(warehouse_details);

  // try {
  //   const new_warehouse = {
  //     email,
  //     title,
  //     address,
  //     city,
  //     country,
  //     association,
  //     role,
  //     company,
  //     date,
  //     time,
  //   };
  //   await warehouse_model.insert_warehouse(new_warehouse);

  //   res.status(201).json({ message: "Warehouse created successfully" });
  // } catch (error) {
  //   console.error("Error creating warehouse:", error);
  //   res.status(500).json({ message: "Error creating warehouse" });
  // }
});

app.post("/pos_stock_updation", async (req, res) => {
  const { company, warehouse_name, SKU, quantity } = req.body;
  console.log(
    `inside pos_stock_updation : company is : ${company},  SKU is : ${SKU},  quantity is : ${quantity},  warehouse_name is : ${warehouse_name}`
  );

  try {
    await pos_closing.update_pos_stock(company, warehouse_name, SKU, quantity);
    console.error("POS stock updated successfully");
    res.status(201).json({ message: "POS stock updated successfully" });
  } catch (error) {
    console.error("Error in POS stock update:", error);
    res.status(500).json({ message: "Error in POS stock update" });
  }
});

app.post("/pos_stock_details", async (req, res) => {
  const { company } = req.body;
  console.log(`inside pos_stock_details : company is : ${company}`);

  let pos_stock_details = [];

  try {
    pos_stock_details = await pos_closing.get_pos_details_Oncompany(company);
    // console.log("pos_stock_details",pos_stock_details);
    res.send(pos_stock_details);
  } catch (error) {
    console.error("Error in POS stock update:", error);
    res.status(500).json({ message: "Error in POS stock update" });
  }
});

//----------------------------  EXPENSE -------------------------------------------------------------------

pos_expenses.create_expenses();

app.post("/create_pos_expense", async (req, res) => {
  const {
    email,
    warehouse,
    company,
    title,
    // description,
    // picture_url,
    // cost_price,
    retail_price,
    tax_amount,
    tax_percentage,
    time,
    date,
    // quantity,
    // SKU,
    // barcode,
    // weight,
    // size,
    // color,
  } = req.body.product;
  console.log("inside create expense", email);

  console.log("showing request body  create expense", req.body);
  let userToken = 0;
  const new_tax_amount = parseInt(tax_amount);

  const new_warehouse_products = {
    email,
    warehouse,
    company,
    title,
    // description,
    // picture_url,
    // cost_price,
    retail_price,
    new_tax_amount,
    tax_percentage,
    time,
    date,
    // quantity,
    // SKU,
    // barcode,
    // weight,
    // size,
    // color,
  };
  console.log("showing new_warehouse_products ::", new_warehouse_products);
  try {
    await pos_expenses.insert_expense(new_warehouse_products);

    res.status(201).json({ message: "Expense created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/get_expenses_by_company", async (req, res) => {
  const { company } = req.body;

  // Check if user already exists
  const existingUser = await pos_expenses.getUserByCompany(company);
  if (existingUser[0].length > 0) {
    res.send(existingUser);
  } else {
    return res.status(409).json({ message: "User warehouse not found" });
  }
});


app.post("/get_expenses_by_email", async (req, res) => {
  const { email } = req.body;
  let company = "";
  try {
    existingUser = await userModel.getUserByEmail(email);
    // console.log(
    //   "showing existing user in get status",
    //   existingUser[0][0].company
    // );
    company = existingUser[0][0].company;
    const all_expenses = await pos_expenses.getUserByCompany(company);
    console.log(
      "showing all expenses in get_expenses_by_email",
      all_expenses[0]
    );
    res.send(all_expenses[0]);
  } catch (error) {
    console.error("Error in get_expenses_by_email:", error);
    res.status(500).json({
      message: "Error in get_expenses_by_email",
      error: error.message,
    });
  }
});

//-----------------------------------------------------------------------------------------------------------

//----------------------------  POS CUSTOMERS ---------------------------------------------------------------

pos_customers.create_customers();

app.post("/create_pos_customers", async (req, res) => {
  const { name, email, cus_email, company, phone, date, time } = req.body;
  // console.log("inside create POS customers", email);

  // console.log("showing request body POS create customers", req.body);
  let userToken = 0;

  const new_customer = {
    email,
    name,
    cus_email,
    company,
    phone,
    date,
    time,
  };
  // console.log("showing new_customer ::", new_customer);
  try {
    await pos_customers.insert_customer(new_customer);

    // console.log("POS customers created successfully");

    res.status(201).json({ message: "POS customers created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/get_customers_by_company", async (req, res) => {
  const { company } = req.body;

  // Check if user already exists
  const existingUser = await pos_customers.getUserByCompany(company);
  if (existingUser[0].length > 0) {
    res.send(existingUser);
  } else {
    return res.status(409).json({ message: "User warehouse not found" });
  }
});

//-----------------------------------------------------------------------------------------------------------

//----------------------------  IMPORT CSV  -------------------------------------------------------------------

app.post("/import_product_details", async (req, res) => {
  const { query } = req.body;
  // // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in import_product_details", query);

  try {
    await warehouse_products_details.import_product_details(query);
    res.status(201).json({ message: "Product Details imported successfully" });
  } catch (error) {
    console.error("Error getting product details:", error);
    res
      .status(500)
      .json({ message: "Error getting product details", error: error.message });
  }
});

app.post("/import_warehouse_products", async (req, res) => {
  const { query } = req.body;
  // // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in import_product_details", query);

  try {
    await warehouse_products.import_warehouse_products(query);
    res.status(201).json({ message: "warehouse_products imported successfully" });
  } catch (error) {
    console.error("Error getting warehouse_products:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse_products", error: error.message });
  }
});

app.post("/import_pos_closing", async (req, res) => {
  const { query } = req.body;
  // // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in import_product_details", query);

  try {
    await pos_closing.import_pos_closing(query);
    res.status(201).json({ message: "pos_closing imported successfully" });
  } catch (error) {
    console.error("Error getting pos_closing:", error);
    res
      .status(500)
      .json({ message: "Error getting pos_closing", error: error.message });
  }
});

app.post("/import_return_items", async (req, res) => {
  const { query } = req.body;
  // // console.log("showing req body  in get warehouse products", req.body);

  console.log("showing email in import_return_items", query);

  try {
    await return_controller.import_return_items(query);
    res.status(201).json({ message: "return items imported successfully" });
  } catch (error) {
    console.error("Error getting return items:", error);
    res
      .status(500)
      .json({ message: "Error getting return items", error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------------------

//----------------------------  Warehouse -------------------------------------------------------------------

// Registration route
app.post("/create_warehouse", async (req, res) => {
  const {
    email,
    store_name,
    api_key,
    token_pass,
    title,
    address,
    city,
    country,
    association,
    company,
    date,
    time,
  } = req.body.product;
  // console.log(`inside create warehouse:: ${company}`);
  let role = "0";
  // let warehouse_id = "";

  // Check if user already exists
  const existingWarehouse = await warehouse_model.get_Primary_Warehouse(
    company
  );
  // console.log("showing existing warehouse", existingWarehouse[0]);
  if (existingWarehouse[0].length > 0) {
    try {
      const new_warehouse = {
        email,
        title,
        address,
        city,
        country,
        association,
        role,
        company,
        date,
        time,
      };
      await warehouse_model.insert_warehouse(new_warehouse);

      if (association === "Shopify") {
        try {
          const fetch_warehouse_details = await warehouse_model.getUserByEmailandWarehouse(
            email,
            title
          );
          let id = fetch_warehouse_details[0][0].id;
          // console.log(
          //   "showing warehouse details",
          //   fetch_warehouse_details[0][0].id
          // );
          // console.log("showing id and all data in warehouse", );
          // const { id } = await warehouse_model.getUserByEmailandWarehouse(
          //   email,
          //   title
          // );
          // console.log("showing warehouse id in create_warehouse", id);
          const new_shopify_warehouse = {
            id,
            title,
            email,
            store_name,
            api_key,
            token_pass,
            company,
            date,
            time,
          };
          await shopify_pos.insert_shopify_warehouse(new_shopify_warehouse);

          // console.log("Shopify warehouse created successfully");
        } catch (error) {
          console.error("Error creating warehouse:", error);
          res.status(500).json({ message: "Error creating warehouse" });
        }
      }

      res.status(201).json({ message: "Warehouse created successfully" });
    } catch (error) {
      console.error("Error creating warehouse:", error);
      res.status(500).json({ message: "Error creating warehouse" });
    }
  } else {
    role = "1";
    try {
      const new_warehouse = {
        email,
        title,
        address,
        city,
        country,
        association,
        role,
        company,
        date,
        time,
      };
      await warehouse_model.insert_warehouse(new_warehouse);

      res.status(201).json({ message: "Warehouse created successfully" });
    } catch (error) {
      console.error("Error creating warehouse:", error);
      res.status(500).json({ message: "Error creating warehouse" });
    }
  }

  // console.log("showing request body ", req.body);
  let userToken = 0;
  // Insert new user
});

app.post("/get_primary_warehouse", async (req, res) => {
  const { email } = req.body;

  // Check if user already exists
  const existingUser = await warehouse_model.get_Primary_Warehouse(email);
  if (existingUser[0].length > 0) {
    res.send(existingUser[0]);
  } else {
    return res.status(409).json({ message: "User warehouse not found" });
  }
});

app.post("/get_warehouse", async (req, res) => {
  const { email } = req.body;
  // console.log("showing email in get warehouse", email);
  try {
    const warehouse_list = await warehouse_model.getUserByEmail(email);
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

app.post("/get_warehouse_By_company", async (req, res) => {
  const { company } = req.body;
  // console.log("showing company in get warehouse", company);
  try {
    const warehouse_list = await warehouse_model.getUserByCompany(company);
    console.log("showing warehouse_list in get_warehouse_By_company",warehouse_list[0]);

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
  // console.log("showing email in get warehouse", email);
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
  // console.log("showing email in get warehouse", email);
  try {
    const warehouse_list = await warehouse_model.getUserByEmailandStore(
      email,
      association
    );
    // console.log("showing warehouse in warehouse store ", warehouse_list[0]);

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

//----------------------------  Warehouse Products Details -------------------------------------------------------------------

app.get("/get_all_products_detail", async (req, res) => {
  // const { email } = req.body;
  // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in warehouse products", email);

  try {
    const warehouse_list = await warehouse_products_details.get_all_details();
    // console.log("showing product listttt::", warehouse_list);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting product details:", error);
    res
      .status(500)
      .json({ message: "Error getting product details", error: error.message });
  }
});

app.post("/get_company_products", async (req, res) => {
  const { email } = req.body;
  // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in company products", email);
  let company = "";
  try {
    existingUser = await userModel.getUserByEmail(email);
    // console.log("showing existing user", existingUser[0][0].company);
    company = existingUser[0][0].company;
  } catch {
    // console.log("error fetching user in suppliers");
  }

  try {
    const warehouse_list = await warehouse_products_details.get_details_Oncompany(
      company
    );
    // console.log("showing company products listttt::", warehouse_list[0]);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting product details:", error);
    res
      .status(500)
      .json({ message: "Error getting product details", error: error.message });
  }
});

//----------------------------  Warehouse Products -------------------------------------------------------------------

warehouse_products.create_warehouse_product();

app.post("/get_warehouse_byCompany", async (req, res) => {
  const { company } = req.body;
  // console.log("showing company in get_warehouse_byCompany", company);
  try {
    const warehouse_list = await warehouse_products.getUserByCompany(company);
    // console.log("showing warehouse listttt::", warehouse_list);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

// Registration route
app.post("/create_warehouse_products", async (req, res) => {
  const {
    email,
    warehouse,
    company,
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
  // console.log("inside create warehouse", email);

  // console.log("showing request body  create warehouse", req.body);
  let userToken = 0;

  const new_warehouse_products = {
    email,
    warehouse,
    company,
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
  // console.log("showing new_warehouse_products ::", new_warehouse_products);
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
  // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in warehouse products", email);
  // console.log("showing warehouse in get warehouse products", warehouse);
  try {
    const warehouse_list = await warehouse_products.getUserByEmailandWarehouse(
      email,
      warehouse
    );
    // console.log("showing warehouse listttt::", warehouse_list);

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
  // console.log("showing req body  in get warehouse products", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const warehouse_list = await warehouse_products.getUserByEmail(email);
    // console.log("showing warehouse listttt::", warehouse_list);

    // Send the warehouse list in the response
    res.send(warehouse_list);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

app.post("/inventory_update", async (req, res) => {
  const { email, warehouse, sku, quantity } = req.body;
  // console.log(
  //   `showing req body in inventory_update ${email}, ${sku}, ${warehouse}, ${quantity} `
  // );
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const response = await warehouse_products.change_inventory(
      email,
      warehouse,
      sku,
      quantity
    );
    // console.log("showing response ::", response);

    // Send the warehouse list in the response
    res.send("Successfully updated inventory");
  } catch (error) {
    console.error("Error updating inventory:", error);
    res
      .status(500)
      .json({ message: "Error updating inventory", error: error.message });
  }
});

//----------------------------  WAREHOUSE COUNTER -------------------------------------------------------------------
warehouse_counter.create_warehouse_counter();

app.post("/update_counter", async (req, res) => {
  const { email, warehouse, counter } = req.body;
  // console.log(
  //   `showing req body in update_counter ${email}, ${warehouse}, ${counter} `
  // );
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const response = await warehouse_counter.update_warehouse_counter(
      email,
      warehouse,
      counter
    );
    // console.log("showing response ::", response);

    // Send the warehouse list in the response
    res.send("Successfully created");
  } catch (error) {
    console.error("Error updating warehouse counter:", error);
    res.status(500).json({
      message: "Error updating warehouse counter",
      error: error.message,
    });
  }
});

app.post("/get_counter", async (req, res) => {
  const { email, warehouse, counter } = req.body;
  // console.log(`showing req body in get_counter ${email}, ${warehouse} `);
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const response = await warehouse_counter.getUserByEmail(email, warehouse);
    // console.log("showing response ::", response[0]);

    // Send the warehouse list in the response
    res.send(response[0]);
  } catch (error) {
    console.error("Error getting counter list:", error);
    res
      .status(500)
      .json({ message: "Error getting counter list", error: error.message });
  }
});

//----------------------------  TRANSFER STOCK -------------------------------------------------------------------
transfer_quantity.create_transfer();

app.post("/insert_transfer", async (req, res) => {
  const {
    // id,
    email,
    // company,
    warehouse_from,
    SKU,
    quantity_sent,
    status_sent,
    f_time,
    f_date,
    warehouse_to,
    quantity_received,
    status_received,
    d_time,
    d_date,
  } = req.body;
  // console.log(
  //   `showing req body in transfer_quantity ${email}, ${SKU}, ${warehouse_from}, ${warehouse_to}, ${quantity_sent} `
  // );
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);

  let company = "";
  let id = "";
  try {
    const warehouse_data = await warehouse_products.getUserByEmailandWarehouse(
      email,
      warehouse_from
    );
    company = warehouse_data[0][0].company;
    id = warehouse_data[0][0].id;
  } catch (error) {
    // console.log("error in insert_transfer", error);
  }
  try {
    const transfer_data = {
      id,
      email,
      company,
      warehouse_from,
      SKU,
      quantity_sent,
      status_sent,
      f_time,
      f_date,
      warehouse_to,
      quantity_received,
      status_received,
      d_time,
      d_date,
    };
    // console.log("showing warehouse_data company in insert_transfer", company);

    const response = await transfer_quantity.insert_transfer(transfer_data);
    // console.log("showing response for insert_transfer ::", response);

    // Send the warehouse list in the response
    res.send("Successfully transferred");
  } catch (error) {
    console.error("Error inserting for transfer:", error);
    res
      .status(500)
      .json({ message: "Error inserting transfer", error: error.message });
  }
});

app.post("/get_transferDetails_By_company", async (req, res) => {
  const { email } = req.body;
  // console.log("showing company in get transfer:: ", email);
  let company = "";
  try {
    const existingUser = await userModel.getUserByEmail(email);
    company = existingUser[0][0].company;
    // console.log(
    //   "showing company in get_transferDetails_By_company:: ",
    //   company
    // );
  } catch (error) {
    console.error("Error in get_transferDetails_By_company:", error);
    res.status(500).json({
      message: "Error in get_transferDetails_By_company",
      error: error.message,
    });
  }
  try {
    const warehouse_list = await transfer_quantity.getUserByCompany(company);
    // console.log(
    //   "showing warehouse_list in get_transferDetails_By_company",
    //   warehouse_list
    // );

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list in get transfer:", error);
    res.status(500).json({
      message: "Error getting warehouse list in get transfer",
      error: error.message,
    });
  }
});

app.post("/transfer_quantity", async (req, res) => {
  const {
    email,
    sku,
    from_warehouse,
    to_warehouse,
    quantity,
  } = req.body.transfer[0];
  // console.log(
  //   `showing req body in transfer_quantity ${email}, ${sku}, ${from_warehouse}, ${to_warehouse}, ${quantity} `
  // );
  // console.log("showing req body in transfer_quantity ", req.body);

  // console.log("showing email in warehouse products", email);
  try {
    const response = await transfer_quantity.transfer_quantity(
      email,
      from_warehouse,
      quantity,
      sku,
      to_warehouse
    );
    // console.log("showing response ::", response);

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
    // // console.log(response.body);
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
    // // console.log(formattedData);
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
    // // console.log(formattedData);
  });
});

app.get("/create_order", (req, res) => {
  request(createOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    // console.log(response.body);
  });
});

app.get("/update_order", (req, res) => {
  request(updateOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
    // console.log(response.body);
  });
});

app.get("/cancel_order", (req, res) => {
  request(cancelOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send("Successfully Cancelled");
    // console.log(response.body);
  });
});

app.get("/delete_order", (req, res) => {
  request(deleteOrder, function (error, response) {
    if (error) throw new Error(error);
    res.send("successfully deleted");
    // console.log(response.body);
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
    // console.log(response.body);
  });
});

app.post("/create_product", (req, res) => {
  // console.log(req.stringify);
  const productCreateData = req.body.product;
  // console.log(
  //   "showing req.body create product shopify ::   ",
  //   productCreateData
  // );
  // console.log(
  //   "saasads",
  //   productCreateData.price,
  //   " sadfssda ",
  //   productCreateData.sku
  // );
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
            price: productCreateData.cost_price,
            sku: productCreateData.SKU,
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

  // console.log("showing createProdModified ::   ", createProdModified.body);

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
    // console.log(response.body);
  });
});

app.get("/delete_product", (req, res) => {
  request(deleteProd, function (error, response) {
    if (error) throw new Error(error);
    res.send("successfully deleted");
    // console.log(response.body);
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
    // console.log(formattedData);
  });
});

//-------------------------------------------------------------------------------------------------------------------

//----------------------------  SHOPIFY WAREHOUSE -------------------------------------------------------------------

app.post("/get_shopify_warehouse_By_company", async (req, res) => {
  const { company } = req.body;
  console.log("showing company in get warehouse", company);
  try {
    const warehouse_list = await shopify_pos.getUserByCompany(company);
    console.log(
      "showing warehouse_list in SHOPIFY WAREHOUSE  get_warehouse_By_company",
      warehouse_list
    );

    // Send the warehouse list in the response
    res.send(warehouse_list[0]);
  } catch (error) {
    console.error("Error getting warehouse list:", error);
    res
      .status(500)
      .json({ message: "Error getting warehouse list", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------------------

//----------------------------  ANALYTICS -------------------------------------------------------------------

app.post("/get_analytics/total_orders", (req, res) => {
  const { store_name, api_key, token_pass } = req.body;
  console.log(
    `storename :: ${store_name} api_key :: ${api_key} token_pass :: ${token_pass} `
  );

  let get_analytics = {
    method: "GET",
    url: `https://${api_key}:${token_pass}@${store_name}.myshopify.com/admin/api/2023-07/orders.json?status=any
    `,
    headers: {
      "Content-type": "application/json",
    },
  };

  // let get_analytics = {
  //   method: "GET",
  //   url: `https://${shopify_api_key}:${shopify_token_pass}@${store}.myshopify.com/admin/api/2023-07/orders.json?status=any
  //   `,
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // };

  request(get_analytics, function (error, response) {
    if (error) throw new Error(error);
    // console.log(
    //   `showing req body in get_analytics/total_orders ${api_key}, ${token_pass}, ${store_name} `
    // );
    const data = JSON.parse(response.body);
    const formattedData = JSON.stringify(data, null, 4);
    res.send(formattedData);
    // console.log(formattedData);
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
    // console.log(formattedData);
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
    // console.log(formattedData);
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
