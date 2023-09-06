const connection = require("../Database/db");

// Create User Table
const create_warehouse_product_details = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS product_list (
        SKU VARCHAR(255) UNIQUE PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        picture_url VARCHAR(255),
        cost_price DECIMAL(10, 2),
        retail_price DECIMAL(10, 2),
        weight DECIMAL(10, 2),
        size VARCHAR(255),
        color VARCHAR(255),
        barcode VARCHAR(255)
      );
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const insert_warehouse_product_details = async (product) => {
  const {
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
  } = product;
  const sql =
    "INSERT INTO product_list (SKU, title, description, picture_url, cost_price, retail_price,  weight, size, color, barcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
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
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM product_list WHERE SKU = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// const getUserByEmailandWarehouse = async (email, warehouse) => {
//   const sql = "SELECT * FROM product_list WHERE email = ? AND warehouse = ?";
//   const pool = await connection.getConnection();
//   try {
//     return await pool.query(sql, [email, warehouse]);
//   } finally {
//     pool.release(); // Release the connection back to the pool
//   }
// };

module.exports = {
  create_warehouse_product_details,
  insert_warehouse_product_details,
//   getUserByEmailandWarehouse,
  getUserByEmail,
};
