import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Transfer_products from "../inventory/Transfer_products";
import List_ftn_all from "../../containers/List_ftn_all";
import MITS_gif from "../../images/MITS_Logo.gif";

import { useSelector } from "react-redux";
import List_pos_closing from "../../containers/List_pos_closing";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
var sortedCustomers = "";
var email_user = "";

function POS_Closing() {
  const [responseData_customers, setResponseData_customers] = useState([]);
  const [responseData_warehouse, setResponseData_warehouse] = useState([]);
  const [updatedlist, setupdatedlist] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);

  const user = auth.currentUser;
  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in add roles", company2[0]);
  var email = "";
  var company_name = "";

  const replaceIdWithTitle = () => {
    if (responseData_customers && responseData_warehouse) {
      const updatedCustomers = responseData_customers.map((customer) => {
        const matchingWarehouseData = responseData_warehouse.find(
          (warehouse) => warehouse.id === customer.id
        );

        if (matchingWarehouseData) {
          // Replace the 'id' value with 'title' from warehouse data
          return {
            ...customer,
            id: matchingWarehouseData.title,
          };
        }

        return customer; // No match found, keep the original data
      });

      // Now 'updatedCustomers' contains the desired data
      //   console.log("updatedCustomers ",updatedCustomers);
      setupdatedlist(updatedCustomers);
    }
  };

  const sorting_function = () => {
    // console.log("in sorting ftn ", responseData_customers);
    if (responseData_customers) {
      const sorted = responseData_customers
        .slice()
        .sort((a, b) => b.pos_id - a.pos_id);

      //   const emailAndTitleArray = sorted.map((row) => ({
      //     id: row.id,
      //     email: row.email || "", // Replace null with ""
      //     name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
      //     phone: row.addresses
      //       .map((addresses) => addresses.phone || "")
      //       .join(", "), // Replace null with "" and join the values
      //     addresses: row.addresses.map((addresses) => {
      //       return `${addresses.address1 || ""}, ${addresses.city || ""}, ${
      //         addresses.country || ""
      //       }`;
      //     }),
      //   }));

      //   console.log("Email and Title Array:", emailAndTitleArray);
      setSortedCustomers(sorted);
      console.log("sortedCustomers", sorted);
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

  async function handle_total_warehouse() {
    if (user) {
      email = user.email;

      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );
      
    //   console.log("filtered companies", filteredCompanies[0].company);
      const requestData = {
        company: filteredCompanies[0].company,
      };

    //   console.log("showing request data", requestData);
      try {
        const response = await axios.post(
          API_LINK + "get_warehouse_By_company",
          requestData
        );
        // console.log("warehouse data from POS closing page :: ", response.data);
        setResponseData_warehouse(response.data);

        if (responseData_customers && responseData_warehouse) {
          const updatedCustomers = responseData_customers.map((customer) => {
            const matchingWarehouseData = responseData_warehouse.find(
              (warehouse) => warehouse.id === customer.id
            );

            if (matchingWarehouseData) {
              // Replace the 'id' value with 'title' from warehouse data
              return {
                ...customer,
                id: matchingWarehouseData.title,
              };
            }

            return customer; // No match found, keep the original data
          });

          // Now 'updatedCustomers' contains the desired data
          //   console.log("updatedCustomers ",updatedCustomers);
          setupdatedlist(updatedCustomers);
          setResponseData_customers(updatedCustomers);
        }
      } catch (error) {
        console.error(
          "Error fetching warehouse data from  POS closing page:",
          error
        );
        // Handle the error
      }
    }
  }

  async function handle_get_cust_data() {
    if (user) {
      email = user.email;

      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );
      company_name = filteredCompanies[0].company;
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
    // handle_total_warehouse();
    handle_get_cust_data();
    // replaceIdWithTitle();
    // sorting_function();
  }, []);

  useEffect(() => {
    sorting_function();
  }, [responseData_customers]);

  return (
    <div>
      {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
        <List_pos_closing combinedData={sortedCustomers} company={company_name}/>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "88vh", // Adjust this value based on your layout
          }}
        >
          <img
            src={MITS_gif}
            alt="Loading..."
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
}

//     const [warehouse_index, set_warehouse_index] = React.useState("");
//     const [warehouse_data, set_warehouse_data] = React.useState("");
//     //   const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index

//     var warehouse_list = "";
//     //   console.log("showing obj1 ", props.obj1);

//     const handleMenuItemClick = (index) => () => {
//       handle_check(index); // Call handle_check only when the MenuItem is clicked
//     };

//     const handle_check = (index) => {
//       set_warehouse_index(index);
//       console.log("showing index", index);
//       console.log("showing warehouse_list", warehouse_list);
//     };

//     const fetch_data = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           email_user = user.email;
//           // console.log("Current user's email:", email_user);
//           // console.log("Current user's email 2 :", email_user);
//           axios
//             .post(API_LINK + "get_warehouse", { email: email_user })
//             .then((response) => {
//               // setProducts(response.data.products);
//               // console.log("send data to backend :: ", response.data);
//               // console.log(typeof response.data);
//               if (response.data) {
//                 set_warehouse_data(response.data);
//               }
//             })
//             .catch((err) => console.error(err));
//         } else {
//           console.log("No user is currently signed in.");
//         }
//       });
//     };

//     useEffect(() => {
//       fetch_data();
//     }, []);

//     const handleChange = (event) => {
//       set_warehouse_index(event.target.value); // Update selected inventory
//       if (event.target.value)
//         console.log(
//           "showing value of menuitem ",
//           warehouse_data[event.target.value]
//         );
//     };

//     return (
//       <div>
//         <Container
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "100%",
//           }}
//         >
//           <FormControl sx={{ m: 1, minWidth: 150, marginTop: "20px" }}>
//             <InputLabel id="demo-simple-select-autowidth-label">
//               Choose Warehouse
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-autowidth-label"
//               id="demo-simple-select-autowidth"
//               value={warehouse_index}
//               onChange={handleChange}
//               autoWidth
//               label="Inventory"
//               onClick={fetch_data}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               {warehouse_data.length > 0
//                 ? warehouse_data.map((warehouse, index) => (
//                     <MenuItem
//                       key={index}
//                       value={index}
//                       onClick={handleMenuItemClick(index)}
//                     >
//                       {warehouse.title}
//                     </MenuItem>
//                   ))
//                 : ""}
//             </Select>
//           </FormControl>
//         </Container>
//         {warehouse_index ? (
//           <Transfer_products
//             warehouse_name={warehouse_data[warehouse_index].title}
//           />
//         ) : warehouse_index === 0 ? (
//           <Transfer_products warehouse_name={warehouse_data[0].title} />
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }

export default POS_Closing;
