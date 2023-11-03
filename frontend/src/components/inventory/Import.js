import { Container, Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import Papa from "papaparse";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import firebase_app from "../../Firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);
var API_LINK = "http://localhost:5000/";

function ImportCSV() {
  const [headerRow, setHeaderRow] = useState(null);
  const [dataRows, setDataRows] = useState(null);

  const user = auth.currentUser;
  const company2 = useSelector((state) => state.users);
  var email = "";
  // console.log("showing company2 in add roles", company2[0]);

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Use FileReader to read the file contents
      const reader = new FileReader();

      reader.onload = (e) => {
        // Parse the CSV data from the FileReader result using PapaParse
        const csvText = e.target.result;
        Papa.parse(csvText, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true, // Skip empty lines

          complete: (result) => {
            // Extract the header row
            const [firstRow] = result.data;
            const row_data = result.data; // Skip the first row (header)

            console.log("data Row:", Object.keys(row_data[0]));
            var headers = [];

            const val11 = [
              "SKU",
              "company",
              "title",
              "description",
              "picture_url",
              "cost_price",
              "retail_price",
              "weight",
              "size",
              "color",
              "barcode",
            ];

            const val22 = [
              "SKU",
              "Company",
              "Title",
              "Description",
              "Picture URL",
              "Cost Price",
              "Retail Price",
              "Weight",
              "Size",
              "Color",
              "Barcode",
            ];

            const val33_warehouse_products = [
              // "email",
              // "company",
              "warehouse",
              "SKU",
              "quantity",
              // "counter",
            ];

            const val34_warehouse_product_all = [
              "email",
              "company",
              "warehouse",
              "SKU",
              "quantity",
              "counter",
            ];

            const val22Lowercase = val22.map((element) =>
              element.toLowerCase()
            );

            const val33Lowercase = val33_warehouse_products.map((element) =>
              element.toLowerCase()
            );

            // Convert all values in the firstRow to lowercase
            const lowercaseHeaderRow = Object.fromEntries(
              Object.entries(firstRow).map(([key, value]) => {
                headers.push(key.toLowerCase());
                return [key.toLowerCase(), value.toLowerCase()];
              })
            );

            console.log("JSON.stringify(headers)", JSON.stringify(headers));
            console.log(
              "JSON.stringify(val22Lowercase)",
              JSON.stringify(val22Lowercase)
            );

            if (JSON.stringify(headers) === JSON.stringify(val22Lowercase)) {
              alert("Uploading Contents");

              setDataRows(row_data);
              const tableName = "product_list";
              const columnNames = val22Lowercase.join(", ");
              const columnNamesWithBackticks = val11
                .map((column) => `\`${column}\``)
                .join(", ");

              // Create an array of SQL insert statements
              const insertStatements = row_data.map((item) => {
                const values = val22.map((column) => {
                  let value = item[column] || ""; // Use an empty string if the value is missing

                  // Check if the column is "Cost Price" or "Retail Price" and parse it as an integer
                  if (
                    column === "Cost Price" ||
                    column === "Retail Price" ||
                    column === "Weight"
                  ) {
                    value = parseInt(value, 10); // Parse the value as an integer with base 10
                  }

                  return typeof value === "string" ? `'${value}'` : value;
                });
                return `(${values.join(", ")})`;
              });

              // Join the insert statements into a single string
              const sqlStatement = `INSERT INTO \`${tableName}\` (${columnNamesWithBackticks}) VALUES\n${insertStatements.join(
                ",\n"
              )};`;

              console.log("sqlStatement", sqlStatement);
              console.log("row_data", row_data);
              if (user) {
                email = user.email;

                const filteredCompanies = company2.filter(
                  (company) => company.email === email
                );
                console.log("filtered companies", filteredCompanies[0]);
                const requestData = {
                  query: sqlStatement,
                  // email: email,
                  // company: filteredCompanies[0].company,
                };
                // email	company	warehouse	SKU	quantity

                // console.log("showing request data", requestData);

                try {
                  const response = axios.post(
                    API_LINK + "import_product_details",
                    requestData
                  );
                  console.log("successfully imported");
                  // setResponseData(response.data);
                } catch (err) {
                  console.log("error importing ", err);
                }
              }
            } else if (
              JSON.stringify(headers) === JSON.stringify(val33Lowercase)
            ) {
              alert("Uploading Contents");
              if (user) {
                email = user.email;

                const filteredCompanies = company2.filter(
                  (company) => company.email === email
                );
                console.log("filtered companies", filteredCompanies[0]);

                // setDataRows(row_data);
                const tableName = "warehouse_product";
                const columnNamesWithBackticks = val34_warehouse_product_all
                  .map((column) => `\`${column}\``)
                  .join(", ");

                // Create an array of SQL insert statements
                const insertStatements = row_data.map((item) => {
                  const values = val34_warehouse_product_all.map((column) => {
                    let value = item[column] || ""; // Use an empty string if the value is missing

                    // Check if the column is "Cost Price" or "Retail Price" and parse it as an integer
                    if (column === "quantity") {
                      value = parseInt(value, 10); // Parse the value as an integer with base 10
                    } else if (column === "counter") {
                      value = 0;
                    } else if (column === "email") {
                      value = email;
                    } else if (column === "company") {
                      value = filteredCompanies[0].company;
                    }

                    return typeof value === "string" ? `'${value}'` : value;
                  });
                  return `(${values.join(", ")})`;
                });

                // Join the insert statements into a single string
                const sqlStatement = `INSERT INTO \`${tableName}\` (${columnNamesWithBackticks}) VALUES\n${insertStatements.join(
                  ",\n"
                )};`;

                console.log("sqlStatement", sqlStatement);
                console.log("row_data", row_data);

                const requestData = {
                  query: sqlStatement,
                };

                // console.log("showing request data", requestData);

                try {
                  const response = axios.post(
                    API_LINK + "import_warehouse_products",
                    requestData
                  );
                  console.log("successfully imported");
                  // setResponseData(response.data);
                } catch (err) {
                  console.log("error importing ", err);
                }
              }
            } else {
              alert(
                "Changed content. Cannot upload the Content. Please try again using the template given"
              );
            }
            // Set the header row in state
            setHeaderRow(lowercaseHeaderRow);
          },
          error: (error) => {
            console.error("CSV parsing error:", error);
          },
        });
      };

      reader.readAsText(file);
    }
  };

  //   const firstObject = details[0];
  //   const headers = Object.keys(firstObject).map((key) => ({
  //     label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
  //     key: key,
  //   }));
  //   useEffect(() => {
  //     console.log("details", details);
  //   }, [details]);

  return (
    <div>
      <Container
        sx={{
          margin: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: "80%" }}
        >
          <Link
            href="https://docs.google.com/spreadsheets/d/1J0TwiHkkwAFXOgkSpCsyXh3-DRGoVQW5xZvSZiELEqo/edit#gid=0" // Replace with your desired URL
            target="_blank" // Open in a new tab/window
            rel="noopener noreferrer" // Security best practice for opening external links
            style={{
              color: "#593993",
              fontWeight: "bold",
              fontSize: "28px",
              marginTop: "20px",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            }}
          >
            Check Template
          </Link>

          <Typography
            sx={{
              color: "#593993",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "20px",
              fontWeight: "italic",
            }}
          >
            Click on "Click Template" to view the template. Download this
            template in your computer and fill the details. Upload the filled
            template to import the products.
          </Typography>
        </Grid>
      </Container>
      <Container
        sx={{
          margin: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: "80%" }}
        >
          <Typography
            sx={{
              color: "#593993",
              fontWeight: "bold",
              fontSize: "28px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            CSV File Uploader
          </Typography>

          <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
          {headerRow && (
            <div>
              <h3>Header Row (Lowercase):</h3>
              <pre>{JSON.stringify(headerRow, null, 2)}</pre>
            </div>
          )}
          {/* {dataRows && (
            <div>
              <h3>Data Rows:</h3>
              <table>
                <thead>
                  <tr>
                    {Object.keys(dataRows[0]).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead> */}
          {/* <tbody>
             Render data rows
             {dataRows.map((row, rowIndex) => (
               <tr key={rowIndex}>
                 {Object.values(row).map((cell, cellIndex) => (
                   <td key={cellIndex}>{cell}</td>
                 ))}
               </tr>
             ))}
           </tbody> */}
          {/* </table>
            </div>
          )} */}
        </Grid>
      </Container>
    </div>
  );
}

export default ImportCSV;

// ------------------------------   Import CSV and showing contents   ------------------------------

// import React, { useState, useEffect } from 'react';

// const ImportCSV = () => {

//       const [fileContent, setFileContent] = useState('');

//       useEffect(() => {
//         // Function to fetch the text file content
//         const fetchTextFile = async () => {
//           try {
//             const response = await fetch('/components/inventory/sample.txt'); // Relative path to your text file
//             console.log("response", response)
//             if (!response.ok) {
//               throw new Error('Failed to fetch the text file');
//             }
//             const text = await response.text();
//             console.log("text", text);
//             setFileContent(text);
//           } catch (error) {
//             console.error('Error fetching the text file:', error);
//           }
//         };

//         fetchTextFile();
//       }, []);

//       const handleDownload = () => {
//         // Create a Blob containing the file content
//         const blob = new Blob([fileContent], { type: 'text/plain' });

//         // Create a temporary anchor element and trigger a download
//         const a = document.createElement('a');
//         a.href = URL.createObjectURL(blob);
//         a.download = 'sample.txt'; // You can set the desired filename here
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       };

//       return (
//         <div>
//           <h2>Text File Download</h2>
//           {fileContent ? (
//             <div>
//               <p>File Content:</p>
//               <pre>{fileContent}</pre>
//               <button onClick={handleDownload}>Download File</button>
//             </div>
//           ) : (
//             <p>Loading file content...</p>
//           )}
//         </div>
//       );
//     };

// export default ImportCSV;
