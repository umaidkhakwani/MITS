const connection = require("../Database/db");

// Create User Table
const create_expenses = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS expenses (
      ex_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      warehouse VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      retail VARCHAR(255) NOT NULL,
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
const insert_expense = async (expense) => {
  const { email, warehouse, company, title, retail_price, time, date } =
    expense;
  const sql =
    "INSERT INTO expenses (email, title, warehouse, company, retail, date, time ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
      email,
      title,
      warehouse,
      company,
      retail_price,
      date,
      time,
    ]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM expenses WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM expenses WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, warehouse) => {
  const sql = "SELECT * FROM expenses WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};



module.exports = {
  create_expenses,
  insert_expense,
  getUserByEmail,
  getUserByCompany,
  getUserByEmailandWarehouse,
};
