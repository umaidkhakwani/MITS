import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

var API_LINK = "http://127.0.0.1:5000/";
var sortedCustomers = "";

function Suppliers() {

  const [responseData_customers, setResponseData_customers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);

  const sorting_function = () => {
    if (responseData_customers) {
      const sorted = responseData_customers
        .slice()
        .sort((a, b) => b.orders_count - a.orders_count);
        
        const emailAndTitleArray = sorted.map((row) => ({
          id: row.id,
          email: row.email || "", // Replace null with ""
          name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
          phone: row.addresses.map((addresses) => addresses.phone || "").join(", "), // Replace null with "" and join the values
          addresses: row.addresses.map((addresses) => {
            return `${addresses.address1 || ""}, ${addresses.city || ""}, ${addresses.country || ""}`;
          }),
        }));
    
        console.log("Email and Title Array:", emailAndTitleArray);
      setSortedCustomers(emailAndTitleArray);
    }
  };
//  sortedCustomers.map((customer) => (
//                     <li key={customer.id}>
//                       <h3>{customer.title}</h3>
//                       <p>ID: {customer.id}</p>
//                       <p>email: {customer.email}</p>
//                       <p>first_name {customer.first_name}</p>
//                       <p>last_name: {customer.last_name}</p>
//                       <p>orders_count: {customer.orders_count}</p>
//                       <p>total_spent: {customer.total_spent}</p>
//                       <p>
//                         Addresses:{" "}
//                         {customer.addresses.map((addresses) => {
//                           return `${addresses.address1}, ${addresses.city}, ${addresses.country}`;
//                         })}
//                       </p>
//                       <p>
//                         Phone Number:{" "}
//                         {customer.addresses.map((addresses) => {
//                           return `${addresses.phone}`;
//                         })}
//                       </p>

  async function handle_get_cust_data() {
    try {
      const response = await axios.get(API_LINK + "get_customers");
      console.log("data sent from backend :: ", response.data.customers);
      console.log(typeof response.data);
      setResponseData_customers(response.data.customers);
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
        ""
      )}
    </div>
  );
}

export default Suppliers;
