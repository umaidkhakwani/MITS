import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

var API_LINK = "http://localhost:5000/";
var sortedCustomers = "";

function ViewRoles(props) {

  var company_name = props.company_name;

  const [responseData_customers, setResponseData_customers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);

  const sorting_function = () => {
    if (responseData_customers) {
      const sorted = responseData_customers
        .slice()
        .sort((a, b) => b.fname - a.fname);

      const emailAndTitleArray = sorted.map((row) => ({
        id: row.id,
        company: row.company || "", // Replace null with ""
        name: (row.fname || "") + " " + (row.lname || ""), // Replace null with ""
        email: row.email || "", // Replace null with ""
        password: row.password || "", // Replace null with ""
        role: row.userToken === "786" ? "Admin" :  "user",
      }));

      console.log("Email and Title Array:", emailAndTitleArray);
      setSortedCustomers(emailAndTitleArray);
    }
  };

  async function handle_get_cust_data() {
    console.log("in function handle_get_cust_data", company_name);


    const requestData = {
        company: company_name,
      };

    await axios
    .post(API_LINK + "getUsers_by_Company", requestData)
    .then((response) => {
      if (response.data) {
        console.log("send data to backend :: ", response.data);
        setResponseData_customers(response.data);
      }
    })
    .catch((err) => console.error(err));
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


export default ViewRoles;
