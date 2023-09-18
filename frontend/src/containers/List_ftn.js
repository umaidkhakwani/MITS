import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Warehouse_list from "../components/warehouse/Warehouse_list";
import axios from "axios";
import { Button, Grid, Input } from "@mui/material";
import EditDialog from "./Verify";

var API_LINK = "http://localhost:5000/";

function List_ftn(props) {
  const { combinedData } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [product_details, setproduct_details] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [changeList, setchangeList] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [editedEmail, setEditedEmail] = useState(""); // State to store edited email
  const [editedPassword, setEditedPassword] = useState(""); // State to store edited password

  const fetchProductDetails = async () => {
    console.log("into fetchProductDetails");
    await axios
      .get(API_LINK + "get_all_products_detail")
      .then((response) => {
        console.log("showing product details:: ", response.data[0]);
        setproduct_details(response.data[0]);
        // console.log(typeof response.data);
        //   setWarehouseDetail(response.data);
        const final = response.data[0].map((filtered) => {
          if (filteredData) {
            const productDetail = filteredData.find(
              (detail) => detail.SKU === filtered.SKU
            );
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    console.log("showing seletcted rows ", selectedRows.length);
  };

  const handleRowClick = async (item) => {
    // fetchProductDetails();

    console.log(item); // Log the values in the row
    setchangeList(item);
    setSelectedRows("");
    // Filter the data based on the clicked item's title
    const filtered = combinedData.filter(
      (dataItem) => dataItem.title === item.title
    );
    console.log("filtered ", filtered);

    // Get titles corresponding to the SKUs from product details
    const filteredTitles = filtered.map((filteredItem) => {
      console.log("filteredItem", filteredItem.SKU);
      const productDetail = product_details.find(
        (detail) => detail.SKU === filteredItem.SKU
      );
      console.log("product detail ----- ", productDetail.title);
      return productDetail ? productDetail.title : "N/A";
    });

    // Combine the title with the remaining details of the filtered items
    const combinedFilteredData = filtered.map((filteredItem, index) => ({
      ...filteredItem,
      title: filteredTitles[index],
    }));

    console.log("showing filtered data", combinedFilteredData);
    setFilteredData(combinedFilteredData);
  };

  const handleSearch = (event) => {
    let val = event.target.value.toString();
    setSearchQuery(val);
  };

  // Search Filtering function
  const filterRows = (row) => {
    // if(searchQuery){

    // console.log("row ",row)

    const { SKU, title, city, Country } = row;
    const normalizedQuery = (searchQuery || "").toLowerCase().trim(); // Add a check for searchQuery

    // console.log("normalizedQuery",normalizedQuery)
    // console.log("SKU",SKU)
    // console.log("title",title)
    // console.log("city",city)
    // console.log("country",Country)

    const SKUString = SKU.toString().toLowerCase();
    const titleString = title.toString().toLowerCase();
    const cityString = city.toString().toLowerCase();
    const countryString = Country.toString().toLowerCase();

    return (
      SKUString.includes(normalizedQuery) ||
      titleString.includes(normalizedQuery) ||
      cityString.includes(normalizedQuery) ||
      countryString.includes(normalizedQuery)
    );
    // }
  };

  const handleEditClick = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleDialogSave = () => {
    // Save the edited email and password user_email, password
    console.log("Edited Email:", editedEmail);
    console.log("Edited Password:", editedPassword);
    // You can perform further actions here with the edited values
    handleDialogClose(); // Close the dialog
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div>
      {changeList ? (
        <div>
          <h2>New Data</h2>
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
                {Object.keys(filteredData[0]).map((key) => (
                  <th key={key} style={{ color: "#593993" }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #593993",
                    marginBottom: "10px",
                    // cursor: "pointer", // Change cursor to pointer
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRowSelection(index)}
                      style={{ width: "15px", height: "20px" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop propagation of checkbox click event
                      }}
                    />
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
      ) : (
        <div>
          <h2>Combined Data</h2>
          <div>
            <Grid container direction="row">
              <Grid item lg={12}>
                {/* Step 2: Search bar */}
                <Input
                  type="text"
                  style={{
                    width: "400px",
                    padding: "5px",
                    color: "black",
                    border: "1px solid #593993",
                    borderRadius: "10px",
                  }}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch} // Step 3: Bind search input to state
                />

                <Button
                  variant="outlined"
                  sx={{
                    color: "#593993",
                    borderColor: "#593993",
                    margin: "20px",
                  }}
                  disabled={selectedRows.length > 1}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#593993",
                    borderColor: "#593993",
                    margin: "20px",
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
          <EditDialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            onEdit={handleDialogSave} // Pass the handleDialogSave function
          />
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
                {Object.keys(combinedData[0]).map((key) => (
                  <th key={key} style={{ color: "#593993" }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {combinedData
                .filter(filterRows) // Step 5: Filter rows based on search query
                .map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #593993",
                      marginBottom: "10px",
                      cursor: "pointer", // Change cursor to pointer
                    }}
                    onClick={() => {
                      handleRowClick(item);
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRowSelection(index)}
                        style={{ width: "15px", height: "20px" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Stop propagation of checkbox click event
                        }}
                      />
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
      )}
    </div>
  );
}

export default List_ftn;

// import React from 'react';

// function List_ftn(props) {

//     const { combinedData } = props

//   return (
// <div>
//       <h2>Combined Data</h2>
//       <ul>
//         {combinedData.map((item, index) => (
//           <li key={index}>
//             {Object.entries(item).map(([key, value]) => (
//               <div key={key}>
//                 <strong>{key}:</strong> {value}<br />
//               </div>
//             ))}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default List_ftn;
