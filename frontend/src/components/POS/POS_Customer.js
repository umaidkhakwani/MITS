import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

import { useSelector } from "react-redux";

import firebase_app from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";

function POS_Customers() {
  const [responseData_customers, setResponseData_customers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [product_options, set_product_options] = useState("view_products");

  const company2 = useSelector((state) => state.users);
  console.log("showing company2", company2);

  const sorting_function = () => {
    if (responseData_customers) {
      const sorted = responseData_customers
        .slice()
        .sort((a, b) => b.orders_count - a.orders_count);

      const emailAndTitleArray = sorted.map((row) => ({
        id: row.id,
        email: row.email || "", // Replace null with ""
        name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
        phone: row.addresses
          .map((addresses) => addresses.phone || "")
          .join(", "), // Replace null with "" and join the values
        addresses: row.addresses.map((addresses) => {
          return `${addresses.address1 || ""}, ${addresses.city || ""}, ${
            addresses.country || ""
          }`;
        }),
      }));

      console.log("Email and Title Array:", emailAndTitleArray);
      setSortedCustomers(emailAndTitleArray);
    }
  };

  async function handle_get_cust_data() {
    const user = auth.currentUser;
    let email = "";
    if (user) {
      email = user.email;
      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );
      console.log("filtered companies", filteredCompanies[0]);

      const requestData = {
        company: filteredCompanies[0].company,
      };

      try {
        const response = await axios.post(
          API_LINK + "get_customers_by_company",
          requestData
        );
        console.log(
          "data sent from backend in inventory products:: ",
          response.data[0]
        );

        const matchingWarehouseData = response.data[0].map((customer) => {
          return {
            ...customer,
            date: customer.date.split('T')[0],
          } 
        })
        console.log("matchingWarehouseData", matchingWarehouseData);
        
        setSortedCustomers(matchingWarehouseData);
        setResponseData_customers(matchingWarehouseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    }
  }

  useEffect(() => {
    handle_get_cust_data();
  }, []);

  useEffect(() => {
    // sorting_function();
  }, [responseData_customers]);

  return (
    <div>
      <div>
        {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
          <List_ftn_all combinedData={sortedCustomers} />
        ) : (
          "No products found"
        )}
      </div>
    </div>
  );
}

export default POS_Customers;
