import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

import { useSelector } from "react-redux";

import firebase_app from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Create_Expense from "./Create_Expense";
import Choose_Expense_POS from "./Choose_Expense_POS";

// import ExportCSV from "./Export";
// import ImportCSV from "./Import";
const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";
// var sortedCustomers = "";

function Expenses() {
  const [responseData_customers, setResponseData_customers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [product_options, set_product_options] = useState("view_expense");

  const company2 = useSelector((state) => state.users);
  console.log("showing company2", company2);

  const handle_view_expense = () => {
    set_product_options("view_expense");
  };

  const handle_create_expense = () => {
    set_product_options("create_expense");
  };

  const handle_import_products = () => {
    set_product_options("import_products");
  };

  const handle_export_products = () => {
    set_product_options("export_products");
  };

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
    let user_company = {};

    if (user) {
      email = user.email;
      user_company = company2.find((obj) => obj.email === email);
      console.log("showing user company", user_company.company);

      const requestData = {
        company: user_company.company,
      };

      try {
        const response = await axios.post(
          API_LINK + "get_expenses_by_company",
          requestData
        );
        console.log(
          "data sent from backend in expenses:: ",
          response.data[0]
        );
        const formattedData = response.data[0].map((entry) => {
          return {
            ...entry,
            date: new Date(entry.date).toISOString().split('T')[0]
          };
        });
        setSortedCustomers(formattedData);
        setResponseData_customers(formattedData);
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
      <Box margin="10px 20px">
        <Stack spacing={2} direction="row" justifyContent="end">
          {/* <Button
            variant="outlined"
            onClick={handle_export_products}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            onClick={handle_import_products}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Import
          </Button> */}
          <Button
            variant="outlined"
            onClick={handle_create_expense}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Create Expense
          </Button>
          <Button
            variant="outlined"
            onClick={handle_view_expense}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            View Expense
          </Button>
        </Stack>
      </Box>

      <div>
      {product_options === "view_expense" ? (
          Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
            <List_ftn_all combinedData={sortedCustomers} />
          ) : (
            <h6>No data inserted</h6>
          )
        ) : product_options === "create_expense" ? (
          <Choose_Expense_POS />
        ) : (
          ""
        )}
        {/* {product_options === "view_expense" ? (
          Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
            <List_ftn_all combinedData={sortedCustomers} />
          ) : (
            ""
          )
        ) : product_options === "create_expense" ? (
          <Products_create />
        ) : product_options === "export_products" ? (
          <ExportCSV details={sortedCustomers}/>
        ) : product_options === "import_products" ? (
          <ImportCSV />
        ) :(
          ""
        )} */}
      </div>
    </div>
  );
}

export default Expenses;
