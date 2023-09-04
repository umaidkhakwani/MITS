const connection = require("../Database/db");

// Create User Table
const create_warehouse_product = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS warehouse_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    warehouse VARCHAR(255) NOT NULL,
    SKU VARCHAR(255) NOT NULL,
    quantity INT,
    FOREIGN KEY (email) REFERENCES warehouse(email) ON DELETE CASCADE,
    FOREIGN KEY (SKU) REFERENCES product_list(SKU)
  );
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const insert_warehouse_product = async (product) => {

  const {
    email,
    warehouse,
    title,
    description,
    picture_url,
    cost_price,
    retail_price,
    quantity,
    barcode,
    SKU,
    weight,
    size,
    color,
  } = product;

  // Insert into product_list table
  const productSql =
    "INSERT INTO product_list (SKU, title, description, picture_url, cost_price, retail_price, weight, size, color, barcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  // Insert into warehouse_product table
  const warehouseProductSql =
    "INSERT INTO warehouse_product (email, warehouse, SKU, quantity) VALUES (?, ?, ?, ?)";

  const pool = await connection.getConnection();
  try {
    await pool.query("START TRANSACTION"); // Start a transaction

    try {
      await pool.query(productSql, [
        SKU,
        title,
        description,
        picture_url,
        cost_price,
        retail_price,
        weight,
        size,
        color,
        barcode,
      ]);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        // Handle unique constraint violation for SKU duplication
        console.error("SKU already exists. Proceeding with warehouseProductSql.");
      } else {
        // Handle other errors
        throw error;
      }
    }
    
    await pool.query(warehouseProductSql, [
      email,
      warehouse,
      SKU,
      quantity,
    ]);

    await pool.query("COMMIT"); // Commit the transaction
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback the transaction in case of error
    throw error;
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};



// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM warehouse_product WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, warehouse) => {
  const sql =
    "SELECT * FROM warehouse_product WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

module.exports = {
  create_warehouse_product,
  insert_warehouse_product,
  getUserByEmailandWarehouse,
  getUserByEmail,
};
