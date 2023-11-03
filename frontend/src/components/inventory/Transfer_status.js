import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import List_ftn_all from "../../containers/List_ftn_all";

var API_LINK = "http://localhost:5000/";
const auth = getAuth(firebase_app);
var email_user = "";
var sortedCustomers = "";

function Transfer_status() {
  const [responseData_customers, setResponseData_customers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);

  const sorting_function = () => {
    if (responseData_customers) {
      const sorted = responseData_customers
        .slice()
        .sort((a, b) => b.ts_id - a.ts_id);

        const emailAndTitleArray = sorted.map((row) => ({
            ts_id: row.ts_id || "",
            email: row.email || "",
            from: row.warehouse_from || "",
            SKU: row.SKU || "",
            quantity: row.quantity_sent || "",
            status: row.status_sent || "",
            time: row.f_time || "",
            date: row.f_date ? row.f_date.split('T')[0] : "", // Format date to YYYY-MM-DD
            to: row.warehouse_to || "",
            received: row.quantity_received || "",
            D_status: row.status_received || "",
            D_time: row.d_time || "",
            D_date: row.d_date ? row.d_date.split('T')[0] : "", // Format date to YYYY-MM-DD
          }));
      

      console.log("Email and Title Array:", emailAndTitleArray);
      setSortedCustomers(emailAndTitleArray);
    }
  };

  async function handle_get_cust_data() {
    try {
      const user = auth.currentUser;
      if (user) {
        email_user = user.email;

        const requestData = {
          email: email_user,
        };
        const response = await axios.post(
          API_LINK + "get_transferDetails_By_company", requestData
        );
        console.log("data sent from backend :: ", response.data);
        console.log(typeof response.data);
        setResponseData_customers(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error
    }
  }

  useEffect(() => {
    handle_get_cust_data();
  }, []);

  useEffect(() => {
    sorting_function();
  }, [responseData_customers]);

  return (
    <div>
      {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
        <List_ftn_all combinedData={sortedCustomers} />
      ) : (
        <h3>No data</h3>
      )}
    </div>
  );
}

export default Transfer_status;
