const connection = require("../Database/db");

// Create User Table
const create_return = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS return_items (
      r_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      SKU VARCHAR(255),
      barcode VARCHAR(255),
      title VARCHAR(255) NOT NULL,
      warehouse VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      retail_price VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      discount_per INT NOT NULL,
      tax_per INT NOT NULL,
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
const insert_return = async (return_items) => {
  const {
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
  } = return_items;
  const sql =
    "INSERT INTO return_items ( email, SKU, barcode, title, warehouse, company, retail_price, quantity, discount_per, tax_per, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
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
    ]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

// Fetch User by Email
const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM return_items WHERE email = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByCompany = async (company) => {
  const sql = "SELECT * FROM return_items WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const getUserByEmailandWarehouse = async (email, warehouse) => {
  const sql = "SELECT * FROM return_items WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const import_return_items = async (query) => {
    // const sql = "SELECT * FROM product_list WHERE company = ?";
    const pool = await connection.getConnection();
    try {
      return await pool.query(query);
    } finally {
      pool.release(); // Release the connection back to the pool
    }
  };



module.exports = {
  create_return,
  insert_return,
  getUserByEmail,
  getUserByCompany,
  getUserByEmailandWarehouse,
  import_return_items,
};
