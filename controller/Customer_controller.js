const connection = require("../Database/db");

// Create User Table
const create_customers = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS customers (
      cus_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      cus_email VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      phone VARCHAR(13) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
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
const insert_customer = async (pos_customer) => {
  const { email, name, cus_email, company, phone, date, time } = pos_customer;
  const sql =
    "INSERT INTO customers (email , name , cus_email , company , phone , date , time ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [email, name, cus_email, company, phone, date, time]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM customers WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM customers WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, warehouse) => {
  const sql = "SELECT * FROM customers WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

module.exports = {
  create_customers,
  insert_customer,
  getUserByEmail,
  getUserByCompany,
  getUserByEmailandWarehouse,
};
