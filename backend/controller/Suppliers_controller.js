const connection = require("../Database/db");

// Create User Table
const create_supplier = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS supplier (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      admin_email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      company VARCHAR(255) NOT NULL, 
      category VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      FOREIGN KEY (admin_email) REFERENCES users(email) ON DELETE CASCADE
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
const insert_supplier = async (supplier) => {
  const { name, email, phone_number, company, category, city, address, country } = supplier;
  const sql =
    "INSERT INTO supplier (name, admin_email, phone_number, company, category, city, address, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
   
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [name, email, phone_number, company, category, city, address, country]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByCompany = async (company) => {
  
  const sql = "SELECT * FROM supplier WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};


module.exports = {
  create_supplier,
  insert_supplier,
  getUserByCompany,
};
