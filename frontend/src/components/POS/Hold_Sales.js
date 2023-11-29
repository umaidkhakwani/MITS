import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [newSale, setNewSale] = useState('');
  const [newItems, setNewItems] = useState([]); // Use an array for new items
  const localStorageKey = 'salesData';

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedSalesData = JSON.parse(localStorage.getItem(localStorageKey));
    if (savedSalesData) {
      setSalesData(savedSalesData);
    }
  }, []);

  // Function to add a new sale
  const addSale = () => {
    if (newSale) {
      const updatedSalesData = [...salesData, { saleName: newSale, items: [] }];
      setSalesData(updatedSalesData);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedSalesData));
      setNewSale('');
      setNewItems([...newItems, '']); // Add a new item state for the new sale
    }
  };

  // Function to add a new item to a sale
  const addItemToSale = (saleIndex) => {
    if (newItems[saleIndex]) {
      const updatedSalesData = [...salesData];
      updatedSalesData[saleIndex].items.push(newItems[saleIndex]);
      setSalesData(updatedSalesData);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedSalesData));
      setNewItems([...newItems, '']); // Add a new item state for the next sale
    }
  };

  return (
    <Container sx={{margin:"30px"}}>
      <h2>Sales Data</h2>
      <ul>
        {salesData.map((sale, saleIndex) => (
          <div key={saleIndex}>
            <h3>{sale.saleName}</h3>
            <ul>
              {sale.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Enter a new item"
              value={newItems[saleIndex]}
              onChange={(e) => {
                const updatedItems = [...newItems];
                updatedItems[saleIndex] = e.target.value;
                setNewItems(updatedItems);
              }}
            />
            <button onClick={() => addItemToSale(saleIndex)}>Add Item</button>
          </div>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter a new sale"
        value={newSale}
        onChange={(e) => setNewSale(e.target.value)}
      />
      <button onClick={addSale}>Add Sale</button>
    </Container>
  );
};

export default Sales;




// import React, { useState, useEffect } from 'react';

// function Sales() {
//   const [sales, setSales] = useState([]);
//   const [newSale, setNewSale] = useState('');
//   const localStorageKey = 'salesData';

//   useEffect(() => {
//     const storedSales = JSON.parse(localStorage.getItem(localStorageKey));
//     if (storedSales) {
//       setSales(storedSales);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(localStorageKey, JSON.stringify(sales));
//   }, [sales]);

//   const handleAddSale = () => {
//     const newSaleData = { items: [], newItem: '' };
//     setSales([...sales, newSaleData]);
//     setNewSale('');
//   };

//   const handleAddItem = (index) => {
//     if (sales[index].newItem.trim() !== '') {
//       const updatedSales = [...sales];
//       updatedSales[index].items.push(sales[index].newItem);
//       updatedSales[index].newItem = '';
//       setSales(updatedSales);
//     }
//   };

//   return (
//     <div>
//       <h1>Sales</h1>
//       <button onClick={handleAddSale}>Add Sale</button>
//       <ul>
//         {sales.map((sale, index) => (
//           <div key={index}>
//             <h3>Sale {index + 1}</h3>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Add item"
//                 value={sale.newItem}
//                 onChange={(e) => {
//                   const updatedSales = [...sales];
//                   updatedSales[index].newItem = e.target.value;
//                   setSales(updatedSales);
//                 }}
//               />
//               <button onClick={() => handleAddItem(index)}>Add Item</button>
//             </div>
//             <ul>
//               {sale.items.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sales;








// import { Box, Button, Container, Stack } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import List_ftn_all from "../../containers/List_ftn_all";

// import { useSelector } from "react-redux";

// import firebase_app from "../../Firebase/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth(firebase_app);

// var API_LINK = "http://191.101.233.66:5000/";
// var sortedCustomers = "";

// function Hold_Sales() {
//   const [responseData_customers, setResponseData_customers] = useState([]);
//   const [sortedCustomers, setSortedCustomers] = useState([]);
//   const [product_options, set_product_options] = useState("view_products");

//   const company2 = useSelector((state) => state.users);
//   console.log("showing company2", company2);

//   const handle_view_products = () => {
//     set_product_options("view_products");
//   };

//   const handle_create_products = () => {
//     set_product_options("create_products");
//   };

//   const handle_import_products = () => {
//     set_product_options("import_products");
//   };

//   const handle_export_products = () => {
//     set_product_options("export_products");
//   };

//   const sorting_function = () => {
//     if (responseData_customers) {
//       const sorted = responseData_customers
//         .slice()
//         .sort((a, b) => b.orders_count - a.orders_count);

//       const emailAndTitleArray = sorted.map((row) => ({
//         id: row.id,
//         email: row.email || "", // Replace null with ""
//         name: (row.first_name || "") + " " + (row.last_name || ""), // Replace null with ""
//         phone: row.addresses
//           .map((addresses) => addresses.phone || "")
//           .join(", "), // Replace null with "" and join the values
//         addresses: row.addresses.map((addresses) => {
//           return `${addresses.address1 || ""}, ${addresses.city || ""}, ${
//             addresses.country || ""
//           }`;
//         }),
//       }));

//       console.log("Email and Title Array:", emailAndTitleArray);
//       setSortedCustomers(emailAndTitleArray);
//     }
//   };

//   async function handle_get_cust_data() {
//     const user = auth.currentUser;
//     let email = "";
//     if (user) {
//       email = user.email;

//       const requestData = {
//         email: email,
//       };

//       try {
//         const response = await axios.post(
//           API_LINK + "get_company_products",
//           requestData
//         );
//         console.log(
//           "data sent from backend in inventory products:: ",
//           response.data[0]
//         );
//         console.log(typeof response.data);
//         setSortedCustomers(response.data[0]);
//         setResponseData_customers(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle the error
//       }
//     }
//   }

//   useEffect(() => {
//     handle_get_cust_data();
//   }, []);

//   useEffect(() => {
//     // sorting_function();
//   }, [responseData_customers]);

//   return (
//     <div>
//       <div>
//         {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
//           <List_ftn_all combinedData={sortedCustomers} />
//         ) : (
//           "No products found"
//         )}
//       </div>
//     </div>
//   );
// }

// export default Hold_Sales;
