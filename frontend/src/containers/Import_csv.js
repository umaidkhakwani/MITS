import React, { useState } from "react";
import Papa from "papaparse";

function CSVFileUploader() {
  const [headerRow, setHeaderRow] = useState(null);
  const [dataRows, setDataRows] = useState(null);


  // Function to handle file upload
  const handleFileUpload = (event) => {
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
            const row_data = result.data.slice(1); // Skip the first row (header)
            
            console.log("data Row:", Object.keys(row_data[0]));
            var headers = [];
            const val11 = [
              "mintemp",
              "maxtemp",
              "rainfall",
              "evaporation",
              "sunshine",
              "windgustdir",
              "windgustspeed",
              "winddir9am",
              "winddir3pm",
              "windspeed9am",
              "windspeed3pm",
              "humidity9am",
              "humidity3pm",
              "pressure9am",
              "pressure3pm",
              "cloud9am",
              "cloud3pm",
              "temp9am",
              "temp3pm",
              "raintoday",
              "risk_mm",
              "raintomorrow",
            ];
            // Convert all values in the firstRow to lowercase
            const lowercaseHeaderRow = Object.fromEntries(
              Object.entries(firstRow).map(([key, value]) => {
                headers.push(key.toLowerCase());
                return [key.toLowerCase(), value.toLowerCase()];
              })
            );

            if (JSON.stringify(headers) === JSON.stringify(val11)) {
              alert(
                "Uploading Contents"
              );
              setDataRows(row_data);
              
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

  return (
    <div>
      <h2>CSV File Uploader</h2>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
      {headerRow && (
        <div>
          <h3>Header Row (Lowercase):</h3>
          <pre>{JSON.stringify(headerRow, null, 2)}</pre>
        </div>
      )}
      {dataRows && (
        <div>
          <h3>Data Rows:</h3>
          <table>
            <thead>
              {/* Render headers based on the first row of data */}
              <tr>
                {Object.keys(dataRows[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
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
          </table>
        </div>
      )}
    </div>
  );
}

export default CSVFileUploader;


