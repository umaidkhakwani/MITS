const connection = require("../Database/db");

// Create User Table
const create_shopify_warehouse = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS shopify_warehouse (
      sw_id INT AUTO_INCREMENT PRIMARY KEY,
      id INT,
      title VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      store_name VARCHAR(255) NOT NULL,
      api_key VARCHAR(255) NOT NULL,
      token_pass VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
      FOREIGN KEY (id) REFERENCES warehouse(id) ON DELETE CASCADE
    )
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Insert a New User
const insert_shopify_warehouse = async (shopify_warehouse) => {
  const { id, title, email, store_name, api_key, token_pass, company, date, time } =
    shopify_warehouse;
  const sql =
    "INSERT INTO shopify_warehouse (id, title, email, store_name, api_key, token_pass, company, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
      id,
      title,
      email,
      store_name,
      api_key,
      token_pass,
      company,
      date,
      time,
    ]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM shopify_warehouse WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM shopify_warehouse WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandshopify_warehouse = async (email, title) => {
  const sql = "SELECT * FROM shopify_warehouse WHERE email = ? AND title = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, title]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};





module.exports = {
  create_shopify_warehouse,
  insert_shopify_warehouse,
  getUserByEmail,
  getUserByCompany,
  getUserByEmailandshopify_warehouse,
};
