const connection = require("../Database/db");

// Create User Table
const create_pos_closing = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS pos_closing (
        pos_id INT AUTO_INCREMENT PRIMARY KEY,
        id INT,
        description TEXT(3000),
        company_name VARCHAR(255),
        total_amount DECIMAL(13, 2),
        cost_price DECIMAL(13, 2),
        user_paid DECIMAL(13, 2),
        transaction VARCHAR(255),
        time TIME NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (id) REFERENCES warehouse(id)
      );
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const insert_pos_closing = async (product) => {
  const {
    id,
    description,
    company,
    total_amount,
    cost_price,
    user_paid,
    transaction,
    time,
    date,
  } = product;
  const sql =
    "INSERT INTO pos_closing (id, description , company_name, total_amount , cost_price , user_paid , transaction, time, date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [
      id,
      description,
      company,
      total_amount,
      cost_price,
      user_paid,
      transaction,
      time,
      date,
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

const get_all_details = async () => {
  const sql = "SELECT * FROM product_list";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const get_pos_details_Oncompany = async (company) => {
  const sql = "SELECT * FROM pos_closing WHERE company_name = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [company]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const update_pos_stock = async (company, warehouse_name, SKU, quantity, time, date) => {
    const sql = `
      UPDATE warehouse_product
      SET quantity = quantity - ?
      WHERE SKU = ? AND company = ? AND warehouse = ?;
    `;
  
    const pool = await connection.getConnection();
    try {
      return await pool.query(sql, [quantity, SKU, company, warehouse_name]);
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

// const transfer_quantity = async (
//   email,
//   fromWarehouse,
//   quantity,
//   sku,
//   toWarehouse
// ) => {
//   let pool;

//   try {
//     // Get a connection from the pool
//     pool = await connection.getConnection();

//     // Begin a transaction
//     await pool.beginTransaction();

//     // console.log("Debug - email:", email);
//     // console.log("Debug - fromWarehouse:", fromWarehouse);
//     // console.log("Debug - quantity:", quantity);
//     // console.log("Debug - sku:", sku);
//     // console.log("Debug - toWarehouse:", toWarehouse);

//     // Step 1: Subtract quantity from 'from_warehouse' for the specified user
//     const subtractQuery = `
//         UPDATE warehouse_product
//         SET quantity = quantity - ?
//         WHERE email = ? AND warehouse = ? AND SKU = ?;
//       `;
//     await pool.query(subtractQuery, [quantity, email, fromWarehouse, sku]);

//     // Step 2: Add quantity to 'to_warehouse' for the specified user
//     const addQuery = `
//         INSERT INTO warehouse_product (email, warehouse, SKU, quantity)
//         VALUES (?, ?, ?, ?)
//         ON DUPLICATE KEY UPDATE quantity = quantity + ?;
//       `;
//     await pool.query(addQuery, [email, toWarehouse, sku, quantity, quantity]);

//     // Commit the transaction
//     await pool.commit();

//     // Release the connection back to the pool
//     pool.release();
//   } catch (error) {
//     // If an error occurs, roll back the transaction
//     if (pool) {
//       await pool.rollback();
//       pool.release();
//     }
//     throw error;
//   }
// };

module.exports = {
  create_pos_closing,
  insert_pos_closing,
  //   getUserByEmailandWarehouse,
  getUserByEmail,
  get_all_details,
  get_pos_details_Oncompany,
  update_pos_stock,
};
