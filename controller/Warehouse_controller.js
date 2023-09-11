const connection = require("../Database/db");

// Create User Table
const create_warehouse = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS warehouse (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      association VARCHAR(255) NOT NULL,
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
const insert_warehouse = async (warehouse) => {
  const { email, title, city, address, country, association,date, time } = warehouse;
  const sql =
    "INSERT INTO warehouse (email, title, city, address, country,association, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const sql2 =
    "INSERT INTO warehouse_counter (email, warehouse) VALUES (?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [email, title, address, city, country,association, date, time]);
    await pool.query(sql2, [email, title]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  
  const sql = "SELECT * FROM warehouse WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, title) => {
    const sql = "SELECT * FROM warehouse WHERE email = ? AND title = ?";
    const pool = await connection.getConnection();
    try {
      return await pool.query(sql, [email, title]);
    } finally {
      pool.release(); // Release the connection back to the pool
    }
  };

  const getUserByEmailandStore = async (email, association) => {
    const sql = "SELECT * FROM warehouse WHERE email = ? AND association = ?";
    const pool = await connection.getConnection();
    try {
      return await pool.query(sql, [email, association]);
    } finally {
      pool.release(); // Release the connection back to the pool
    }
  };


module.exports = {
  create_warehouse,
  insert_warehouse,
  getUserByEmailandStore,
  getUserByEmail,
  getUserByEmailandWarehouse,
};
