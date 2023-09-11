const connection = require("../Database/db");

// Create User Table
const create_warehouse_counter = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS warehouse_counter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    warehouse VARCHAR(255) NOT NULL,
    counter INT DEFAULT 0
    );
  `;
  const pool = await connection.getConnection();
  try {
    await pool.query(sql);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const insert_warehouse_counter = async (warehouse, counter, email) => {
 
  const sql =
    "INSERT INTO warehouse_counter (email, warehouse, counter) VALUES (?, ?, ?)";
  const pool = await connection.getConnection();
  try {
    await pool.query(sql, [email, warehouse, counter]);
  } finally {
    pool.release(); // Release the connection back to the pool
  }
};

const update_warehouse_counter = async (email, warehouse, counter) => {
    const sql =
      "UPDATE warehouse_counter SET counter = ? WHERE email = ? AND warehouse = ?";
    const pool = await connection.getConnection();
    try {
      await pool.query(sql, [counter, email, warehouse]);
    } finally {
      pool.release(); // Release the connection back to the pool
    }
  };
  

// Fetch User by Email
const getUserByEmail = async (email, warehouse) => {
  const sql = "SELECT * FROM warehouse_counter WHERE email = ? AND warehouse = ?";
  const pool = await connection.getConnection();
  try {
    return await pool.query(sql, [email, warehouse]);
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

module.exports = {
    create_warehouse_counter,
    insert_warehouse_counter,
    update_warehouse_counter,
  //   getUserByEmailandWarehouse,
  getUserByEmail,
};
