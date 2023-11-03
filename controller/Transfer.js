const connection = require("../Database/db");

const create_transfer = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS transfer (
      ts_id INT AUTO_INCREMENT PRIMARY KEY,
      id INT,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      warehouse_from VARCHAR(255) NOT NULL,
      SKU VARCHAR(255) NOT NULL,
      quantity_sent INT,
      status_sent VARCHAR(255) NOT NULL,
      f_time TIME NOT NULL,
      f_date DATE NOT NULL,
      warehouse_to VARCHAR(255) NOT NULL,
      quantity_received INT,
      status_received VARCHAR(255) NOT NULL,
      d_time TIME NOT NULL,
      d_date DATE NOT NULL,
      FOREIGN KEY (id) REFERENCES warehouse_product(id) ON DELETE CASCADE
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
const insert_transfer = async (transfer) => {
  const {
    id,
    email,
    company,
    warehouse_from,
    SKU,
    quantity_sent,
    status_sent,
    f_time,
    f_date,
    warehouse_to,
    quantity_received,
    status_received,
    d_time,
    d_date,
  } = transfer;
  const sql =
    "INSERT INTO transfer (id, email, company, warehouse_from, SKU, quantity_sent, status_sent, f_time, f_date, warehouse_to, quantity_received, status_received, d_time, d_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
      id,
      email,
      company,
      warehouse_from,
      SKU,
      quantity_sent,
      status_sent,
      f_time,
      f_date,
      warehouse_to,
      quantity_received,
      status_received,
      d_time,
      d_date,
    ]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};


const getUserByCompany = async (company) => {
  
  const sql = "SELECT * FROM transfer WHERE company = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};


// Insert a New User
const transfer_quantity = async (
  email,
  fromWarehouse,
  quantity,
  sku,
  toWarehouse
) => {
  let pool;

  try {
    // Get a connection from the pool
    pool = await connection.getConnection();

    // Begin a transaction
    await pool.beginTransaction();

    // console.log("Debug - email:", email);
    // console.log("Debug - fromWarehouse:", fromWarehouse);
    // console.log("Debug - quantity:", quantity);
    // console.log("Debug - sku:", sku);
    // console.log("Debug - toWarehouse:", toWarehouse);

    // Step 1: Subtract quantity from 'from_warehouse' for the specified user
    const subtractQuery = `
        UPDATE warehouse_product
        SET quantity = quantity - ?
        WHERE email = ? AND warehouse = ? AND SKU = ?;
      `;
    await pool.query(subtractQuery, [quantity, email, fromWarehouse, sku]);

    // Step 2: Add quantity to 'to_warehouse' for the specified user
    const addQuery = `
        INSERT INTO warehouse_product (email, warehouse, SKU, quantity)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?;
      `;
    await pool.query(addQuery, [email, toWarehouse, sku, quantity, quantity]);

    // Commit the transaction
    await pool.commit();

    // Release the connection back to the pool
    pool.release();
  } catch (error) {
    // If an error occurs, roll back the transaction
    if (pool) {
      await pool.rollback();
      pool.release();
    }
    throw error;
  }
};

module.exports = {
  transfer_quantity,
  create_transfer,
  insert_transfer,
  getUserByCompany,
};
