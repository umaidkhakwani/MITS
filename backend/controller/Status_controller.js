const connection = require("../Database/db");

// Create User Table
const create_status = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS status (
      s_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      warehouse VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      totalCostPrice INT NOT NULL,
      totalDiscount INT NOT NULL,
      totalRetail INT NOT NULL,
      time TIME NOT NULL,
      date DATE NOT NULL,
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
const insert_status = async (status) => {
  const { email, warehouse, company, totalCostPrice, totalDiscount, totalRetail, time, date } = status;
  const sql =
    "INSERT INTO status ( email, warehouse, company, totalCostPrice, totalDiscount, totalRetail, time, date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [email, warehouse, company, totalCostPrice, totalDiscount, totalRetail, time, date]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM status WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM status WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, warehouse) => {
  const sql = "SELECT * FROM status WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

module.exports = {
  create_status,
  insert_status,
  getUserByEmail,
  getUserByCompany,
  getUserByEmailandWarehouse,
};
