const connection = require("../Database/db");


// Insert a New User
const transfer_quantity = async (email, fromWarehouse, quantity, sku, toWarehouse) => {
    let pool;
  
    try {
      // Get a connection from the pool
      pool = await connection.getConnection();
  
      // Begin a transaction
      await pool.beginTransaction();

      console.log("Debug - email:", email);
      console.log("Debug - fromWarehouse:", fromWarehouse);
      console.log("Debug - quantity:", quantity);
      console.log("Debug - sku:", sku);
      console.log("Debug - toWarehouse:", toWarehouse);
  
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
    transfer_quantity
};
