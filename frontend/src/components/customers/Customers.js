import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List_ftn_all from "../../containers/List_ftn_all";

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";

function Customers() {

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







//----------------------    OLD CODE    ----------------------//


//   const [cust_options, set_cust_options] = useState("");
//   const [responseData_customers, setresponseData_customers] = useState(null);
//   const [page_options, set_page_options] = useState("");

//   const sorting_function = () => {
//     if(responseData_customers){
//     sortedCustomers = responseData_customers
//       .slice()
//       .sort((a, b) => b.orders_count - a.orders_count);
//     }
//   };

//   const get_customers = () => {
//     set_cust_options("get_data");
//     handle_get_cust_data();
//     set_page_options("get_customers");
//     console.log("iam in get data");
//   };

//   async function handle_get_cust_data() {
//     try {
//       const response = await axios.get(API_LINK + "get_customers");
//       console.log("data sent from backend :: ", response.data.customers);
//       console.log(typeof response.data);
//       setresponseData_customers(response.data.customers);
//       sorting_function(); // Move this line to after setting the state
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error
//     }
//   }

//   useEffect(() => {
//     handle_get_cust_data();
//     const interval = setInterval(() => {
//       const now = new Date();
//       const date_seconds = now.getSeconds();
//       console.log(date_seconds);
      
//       // callFunction();
//     //   if (page_options === "get_customers") {
//     //     console.log("hey");
//     //     handle_get_cust_data();
//     //   } else if (page_options === "get_orders") {
//     //     console.log("hello");
//     //   } else {
//     //     console.log("bye");
//     //   }
//       console.log("showing page options", page_options);
//     }, 10000); // Call the function every 10 second (1000 milliseconds)

//     return () => {
//       clearInterval(interval); // Clean up the interval when the component unmounts
//     };
//   }, []);

//   return (
//     <div>
//       <Container>
//         <h1>iam in Customers</h1>
//         <Box margin="10px">
//           <Stack spacing={2} direction="row" justifyContent="space-evenly">
//             <Button variant="outlined" onClick={get_customers}>
//               Get data
//             </Button>
//           </Stack>
//         </Box>
//         <div>
//           {cust_options === "get_data" ? (
//             <div>
//               <ul>
//                 {Array.isArray(sortedCustomers) &&
//                 sortedCustomers.length > 0 ? (
//                   sortedCustomers.map((customer) => (
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
//                       {/* <p>details: {JSON.stringify(customer, null, 2)}</p> */}
//                     </li>
//                   ))
//                 ) : (
//                   <p>no customer data available</p>
//                 )}
//               </ul>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// }

export default Customers;
