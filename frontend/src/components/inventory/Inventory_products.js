import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

import { useSelector } from "react-redux";

import firebase_app from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Products_create from "./Products_create";
import ExportCSV from "./Export";
import ImportCSV from "./Import";
const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
// var product_details = "";

function Inventory_products() {
  const [responseData_customers, setResponseData_customers] = useState([]);
  const [product_details, setproduct_details] = useState([]);
  const [pos_closing, setpos_closing] = useState([]);
  const [return_items, setreturn_items] = useState([]);
  const [warehouse_details, setwarehouse_details] = useState([]);
  const [pos_details, setpos_details] = useState([]);
  const [product_options, set_product_options] = useState("view_products");

  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in inventory_products", company2);

  const user = auth.currentUser;
  var email = "";

  if (user) {
    email = user.email;
  }

  const handle_view_products = () => {
    set_product_options("view_products");
  };

  const handle_create_products = () => {
    set_product_options("create_products");
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

      // const emailAndTitleArray = sorted.map((row) => ({
      //   id: row.id,
      //   email: row.email || "", // Replace null with ""
      //   name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
      //   phone: row.addresses
      //     .map((addresses) => addresses.phone || "")
      //     .join(", "), // Replace null with "" and join the values
      //   addresses: row.addresses.map((addresses) => {
      //     return `${addresses.address1 || ""}, ${addresses.city || ""}, ${
      //       addresses.country || ""
      //     }`;
      //   }),
      // }));

      // console.log("Email and Title Array:", emailAndTitleArray);
      setpos_details(sorted);
    }
  };

  async function handle_get_product_data() {
    // const user = auth.currentUser;
    // let email = "";
    if (user) {
      email = user.email;

      const requestData = {
        email: email,
      };

      try {
        const response = await axios.post(
          API_LINK + "get_company_products",
          requestData
        );
        console.log(
          "data get_company_products from backend in inventory products:: ",
          response.data[0]
        );
        console.log(typeof response.data);
        setproduct_details(response.data[0]);
        // setResponseData_customers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    }
  }

  async function handle_return(){
    const requestData = {
      email: email,
    };
    try {
      const response = await axios.post(
        API_LINK + "get_return_data",
        requestData
      );
      console.log("Successfully fetched all returns ", response.data);
      // set_all_returns(response.data);
      setreturn_items(response.data);
      }catch(error){
        console.log("Error fetching return data ", error);
      }
  }

  async function handle_get_warehouse_data() {

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
          API_LINK + "get_warehouse_By_company",
          requestData
        );
        console.log(
          "data get_warehouse_By_company from backend in inventory products:: ",
          response.data
        );
        console.log(typeof response.data);
        const newData = response.data.map((item) => {
          const { title, city, address, country, association, date, time } =
            item;
          return {
            title,
            city,
            address,
            country,
            association,
            date,
            time,
          };
        });
        console.log("newData", newData);
        setwarehouse_details(newData);
        // setResponseData_customers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    }
  }

  async function handle_get_pos_data() {
    if (user) {
      email = user.email;

      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );
      // company_name = filteredCompanies[0].company;
    //   console.log("filtered companies", filteredCompanies[0].company);
      const requestData = {
        company: filteredCompanies[0].company,
      };

      var response_customers = "";
      var response_warehouse = "";

      try {
        const response = await axios.post(
          API_LINK + "pos_stock_details",
          requestData
        );
        // console.log("data from POS closing page :: ", response.data[0]);
        // setResponseData_customers(response.data[0]);
        response_customers = response.data[0];

        try {
          const response = await axios.post(
            API_LINK + "get_warehouse_By_company",
            requestData
          );
          console.log(
            "warehouse data from POS closing page :: ",
            response.data
          );
          //   setResponseData_warehouse(response.data);
          response_warehouse = response.data;

          if (response_customers && response_warehouse) {
            const updatedCustomers = response_customers.map((customer) => {
              const matchingWarehouseData = response_warehouse.find(
                (warehouse) => warehouse.id === customer.id
              );

              const regex = /\((\d+)\)/g; // Matches (number)
              let match;
              let totalQuantity = 0;

              while ((match = regex.exec(customer.description)) !== null) {
                const quantity = parseInt(match[1], 10); // Parse the quantity as an integer
                totalQuantity += quantity;
              }

              let new_date = '';
              if (customer.date && typeof customer.date === 'string') {
                new_date = customer.date.split('T')[0];
              }
            //   console.log("customer: ", new_date);
              if (matchingWarehouseData) {
                // Replace the 'id' value with 'title' from warehouse data
                return {
                  ...customer,
                  id: matchingWarehouseData.title,
                  date: new_date,
                  quantity: totalQuantity,
                };
              }

              return customer; // No match found, keep the original data
            });

            // Now 'updatedCustomers' contains the desired data
            // console.log("updatedCustomers ", updatedCustomers);
            // setupdatedlist(updatedCustomers);
            setResponseData_customers(updatedCustomers);
          }
        } catch (error) {
          console.error(
            "Error fetching warehouse data from  POS closing page:",
            error
          );
          // Handle the error
        }
      } catch (error) {
        console.error("Error fetching data from POS closing page:", error);
        // Handle the error
      }
    }
  }


  useEffect(() => {
    handle_return();
    handle_get_product_data();
    handle_get_warehouse_data();
    handle_get_pos_data();
  }, []);

  useEffect(() => {
    sorting_function();
  }, [responseData_customers]);

  return (
    <div>
      <Box margin="10px">
        <Stack spacing={2} direction="row" justifyContent="end">
          <Button
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
          </Button>
          <Button
            variant="outlined"
            onClick={handle_create_products}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            Create Product
          </Button>
          <Button
            variant="outlined"
            onClick={handle_view_products}
            sx={{ color: "#593993", borderColor: "#593993" }}
          >
            View Products
          </Button>
        </Stack>
      </Box>

      <div>
        {product_options === "view_products" ? (
          Array.isArray(product_details) && product_details.length > 0 ? (
            <List_ftn_all combinedData={product_details} />
          ) : (
            ""
          )
        ) : product_options === "create_products" ? (
          <Products_create />
        ) : product_options === "export_products" ? (
          <ExportCSV details={product_details} warehouseDetails={warehouse_details} posDetails ={pos_details} return_items_data={return_items} />
        ) : product_options === "import_products" ? (
          <ImportCSV />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Inventory_products;
