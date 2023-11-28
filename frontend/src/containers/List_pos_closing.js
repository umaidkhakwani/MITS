import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Warehouse_list from "../components/warehouse/Warehouse_list";
import axios from "axios";
import {
  Backdrop,
  Button,
  Container,
  Fade,
  Grid,
  Input,
  Modal,
} from "@mui/material";
import EditDialog from "./Verify";
import firebase_app from "../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Update_warehouse_info from "../components/warehouse/Update_warehouse_info";
import CSVFileUploader from "./Import_csv";

const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";

function List_pos_closing(props) {
  const { combinedData } = props;
  const { company_name } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [product_details, setproduct_details] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = auth.currentUser;
  var email = "";

  // Function to handle row click
  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const fetch_product_detail_list = async () => {
    if (user) {
      email = user.email;
      const requestData = {
        email: email,
      };
      console.log("requestData in list_pos_closing", requestData);

      const response = await axios.post(
        API_LINK + "get_company_products",
        requestData
      );
      console.log("showing response in list_pos_closing", response.data[0]);
      setproduct_details(response.data[0]);
      // setResponseData(response.data);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    fetch_product_detail_list();
  }, [combinedData]);

  return (
    <Container sx={{ marginTop: "10px" }}>
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
                margin: "20px 0px",
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
      <table
        style={{
          borderCollapse: "collapse",
          border: "0px solid #593993",
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {combinedData.length > 0 &&
              Object.keys(combinedData[0]).map((key) => (
                <th key={key} style={{ color: "#593993" }}>
                  {key == "company_name" ? "company" : key}
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
                overflow: "hidden",
                width: "100%",
              }}
              onClick={() => handleRowClick(item)}
            >
              {/*<td>
                 <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => toggleRowSelection(index)}
                    style={{ width: "15px", height: "20px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  /> 
              </td>*/}
              {Object.values(item).map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    width: `${100 / Object.keys(combinedData[0]).length}%`, // Divide the width equally
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <table
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
              Object.keys(combinedData[0]).map((key, index) => (
                <th
                  key={key}
                  style={{
                    color: "#593993",
                    width: "150px",
                    textAlign: "center", // Align header text to center
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
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
              onClick={() => handleRowClick(item)}
            >
              {Object.values(item).map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    width: "150px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div
            style={{
              background: "linear-gradient(to bottom, #593993, #9319B5)",
              color: "white",
              padding: "20px",
              position: "absolute",
              //   height: "300px",
              width: "300px",
              borderRadius: "40px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {selectedRowData &&
              Object.keys(selectedRowData).map((key, valueIndex) => {
                if (key === "description") {
                  const descriptionValue = selectedRowData[key];
                  const parts = descriptionValue.split(",");
                  const updatedDescription = parts
                    .map((part) => {
                      if (part != "") {
                        const [barcode, quantity] = part.split("(");
                        const product = product_details.find(
                          (product) => product.barcode === barcode
                        );
                        const title = product ? product.title : barcode;
                        return `${title} (${quantity})`;
                      } else {
                        return "";
                      }
                    })
                    .join("<br />");

                  return (
                    <div key={valueIndex}>
                      <strong>{key}:</strong>
                      <div
                        dangerouslySetInnerHTML={{ __html: updatedDescription }}
                      />
                    </div>
                  );
                } else if (key === "gst") {
                  const descriptionValue = selectedRowData[key];
                  const parts = descriptionValue.split(",");
                  const updatedDescription = parts
                    .map((part) => {
                      if (part != "") {
                        const [barcode, quantity] = part.split("(");
                        const product = product_details.find(
                          (product) => product.barcode === barcode
                        );
                        const title = product ? product.title : barcode;
                        const price = product ? (parseInt(quantity) * ((parseFloat(product.retail_price) * parseInt(quantity) )/100)) : "0";
                        return `${title} (${quantity}) - ${price.toFixed(2).toString()}`;
                      } else {
                        return "";
                      }
                    })
                    .join("<br />");

                  return (
                    <div key={valueIndex}>
                      <strong>{key}:</strong>
                      <div
                        dangerouslySetInnerHTML={{ __html: updatedDescription }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={valueIndex}>
                      <strong>{key}: </strong> {selectedRowData[key]}
                    </div>
                  );
                }
              })}
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(45deg, #593993, #9319B5)",
                boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                color: "white",
              }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default List_pos_closing;
