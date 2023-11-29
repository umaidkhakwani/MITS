import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Warehouse_list from "../components/warehouse/Warehouse_list";
import axios from "axios";
import { Button, Container, Grid, Input } from "@mui/material";
import EditDialog from "./Verify";
import firebase_app from "../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Update_warehouse_info from "../components/warehouse/Update_warehouse_info";
import CSVFileUploader from "./Import_csv";

const auth = getAuth(firebase_app);

var API_LINK = "127.0.0.1:5000/";

function List_ftn_all(props) {
  const { combinedData } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterRows = (row) => {
    if (!searchQuery) {
      return true; // Show all rows if no search query is provided
    }

    const values = Object.values(row);
    for (const value of values) {
      if (value && value.toString().toLowerCase().includes(searchQuery)) {
        return true; // Show the row if any value contains the search query
      }
    }
    return false; // Hide the row if no value contains the search query
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setSelectedRows([]);
  }, [combinedData]);

  return (
 
      <Container sx={{marginTop:"10px"}}>
        <div>
          <Grid container direction="row">
            <Grid item lg={12}></Grid>
          </Grid>
        </div>
        <div>
          <Grid container direction="row">
            <Grid item lg={12}>
              {/*  Search bar */}
              <Input
                type="text"
                style={{
                  width: "400px",
                  margin:"20px 0px",
                  padding: "5px",
                  color: "black",
                  border: "1px solid #593993",
                  borderRadius: "10px",
                }}
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch} //  Bind search input to state
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table
          style={{
            borderCollapse: "collapse",
            border: "0px solid #593993",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "30px" }}></th>
              {combinedData.length > 0 &&
                Object.keys(combinedData[0]).map((key) => (
                  <th key={key} style={{ color: "#593993"}}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {combinedData.filter(filterRows).map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #593993",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <td>
                  {/* <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => toggleRowSelection(index)}
                    style={{ width: "15px", height: "20px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  /> */}
                </td>
                {Object.values(item).map((value, valueIndex) => (
                  <td
                    key={valueIndex}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Container>
   
  );
}

export default List_ftn_all;

// function List_ftn_all(props) {
//     const { combinedData } = props;
//     //   const {  } = props;
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [product_details, setproduct_details] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

//     const fetchProductDetails = async () => {
//         console.log("into fetchProductDetails");
//         await axios
//         .get(API_LINK + "get_all_products_detail")
//         .then((response) => {
//             console.log("showing product details:: ", response.data[0]);
//             setproduct_details(response.data[0]);
//             const final = response.data[0].map((filtered) => {
//             if (filteredData) {
//                 const productDetail = filteredData.find(
//                 (detail) => detail.SKU === filtered.SKU
//                 );
//             }
//             });
//         })
//         .catch((err) => console.error(err));
//     };

//     const toggleRowSelection = (index) => {
//         if (selectedRows.includes(index)) {
//         setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//         } else {
//         setSelectedRows([...selectedRows, index]);
//         }
//         console.log("showing seletcted rows ", selectedRows.length);
//     };

//     const handleSearch = (event) => {
//         let val = event.target.value.toString();
//         setSearchQuery(val);
//     };

//     // Search Filtering function
//     const filterRows = (row) => {
//         if(searchQuery){

//         console.log("row ",row)

//         const { SKU, title, city, Country } = row;
//         const normalizedQuery = (searchQuery || "").toLowerCase().trim(); // Add a check for searchQuery

//         // console.log("normalizedQuery",normalizedQuery)
//         // console.log("SKU",SKU)
//         // console.log("title",title)
//         // console.log("city",city)
//         // console.log("country",Country)

//         const SKUString = SKU.toString().toLowerCase();
//         const titleString = title.toString().toLowerCase();
//         const cityString = city.toString().toLowerCase();
//         const countryString = Country.toString().toLowerCase();

//         return (
//           SKUString.includes(normalizedQuery) ||
//           titleString.includes(normalizedQuery) ||
//           cityString.includes(normalizedQuery) ||
//           countryString.includes(normalizedQuery)
//         );
//         }
//       };

//   const handleDeleteClick = () => {
//     setIsDialogOpen(true); // Open the dialog
//   };

//   const handleEditClick = () => {
//     setIsDialogOpen(true); // Open the dialog
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false); // Close the dialog
//   };

//     //   const handle_edit_fields = (value) => {
//     //     console.log("showing value", value);
//     //     setedit_fields(value); // Close the dialog
//     //   };

//   const handleDialogSave = async (user_email, password) => {
//     // Save the edited email and password
//     console.log("Edited Email:", user_email);
//     console.log("Edited Password:", password);
//     // You can perform further actions here with the edited values
//     handleDialogClose(); // Close the dialog
//   };

//   useEffect(() => {
//     console.log("combined Data in list ftn ", combinedData);
//     fetchProductDetails();
//   }, []);

//   return (
//     <div>

//         <div>
//           <h2>Combined Data</h2>
//           <div>

//             <Grid container direction="row">
//               <Grid item lg={12}></Grid>
//             </Grid>
//           </div>
//           <div>
//             <Grid container direction="row">
//               <Grid item lg={12}>
//                 {/*  Search bar */}
//                 <Input
//                   type="text"
//                   style={{
//                     width: "400px",
//                     padding: "5px",
//                     color: "black",
//                     border: "1px solid #593993",
//                     borderRadius: "10px",
//                   }}
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearch} //  Bind search input to state
//                 />

//               </Grid>
//             </Grid>
//           </div>
//           <table
//             style={{
//               borderCollapse: "collapse",
//               border: "0px solid #593993",
//               width: "100%",
//             }}
//           >
//            <thead>
//           <tr>
//             <th style={{ width: "30px" }}></th>
//             {combinedData.length > 0 &&
//               Object.keys(combinedData[0]).map((key) => (
//                 <th key={key} style={{ color: "#593993" }}>
//                   {key}
//                 </th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {combinedData
//             .filter(filterRows)
//             .map((item, index) => (
//               <tr
//                 key={index}
//                 style={{
//                   borderBottom: "1px solid #593993",
//                   marginBottom: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(index)}
//                     onChange={() => toggleRowSelection(index)}
//                     style={{ width: "15px", height: "20px" }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                     }}
//                   />
//                 </td>
//                 {Object.values(item).map((value, valueIndex) => (
//                   <td
//                     key={valueIndex}
//                     style={{ textAlign: "center", padding: "10px" }}
//                   >
//                     {value}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//         </tbody>
//           </table>
//         </div>
//     </div>
//   );
// }

// export default List_ftn_all;
