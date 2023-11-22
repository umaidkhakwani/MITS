const connection = require("./db");

// Create User Table
const createUserTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company VARCHAR(255) NOT NULL,
      fname VARCHAR(255) NOT NULL,
      lname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      userToken VARCHAR(255) NOT NULL
    )
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// // Insert a New User
// const insertUser = (user) => {
//   const { fname, lname, email, password, userToken } = user;
//   const sql = 'INSERT INTO users (fname, lname, email, password, userToken) VALUES (?, ?, ?, ?, ?)';
//   return connection.promise().query(sql, [fname, lname, email, password, userToken]);
// };

// // Fetch User by Email
// const getUserByEmail = (email) => {
//   const sql = 'SELECT * FROM users WHERE email = ?';
//   return connection.promise().query(sql, [email]);
// };

// Insert a New User
const insertUser = async (user) => {
  const { fname, lname, email, password, company, userToken } = user;
  const sql =
    "INSERT INTO users (fname, lname, email, password, company, userToken) VALUES (?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [fname, lname, email, password, company, userToken]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM users WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const updateUser = async (user) => {
  const {  fname, lname, email, password, company, userToken } = user;
  const sql =
    "UPDATE users SET fname = ?, lname = ?, password = ?, userToken = ? WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [fname, lname, password, userToken, email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const updateAdminUser = async (user) => {
  const {  fname, lname, email, password } = user;
  const sql =
    "UPDATE users SET fname = ?, lname = ?, password = ? WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [fname, lname, password, email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};


module.exports = {
  createUserTable,
  insertUser,
  getUserByEmail,
  getUserByCompany,
  updateUser,
  updateAdminUser,
};
