// import React from 'react';

// function RowTitleDisplay({ title }) {
//   return (
//     <div>
//       <h2>Clicked Row Title</h2>
//       <p>Title: {title}</p>
//     </div>
//   );
// }

// export default RowTitleDisplay;



import React, { useState } from "react";
import Papa from "papaparse";

function CSVFileUploader() {
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
          dynamicTyping: true, // Automatically convert numeric and boolean values
          complete: (result) => {
            // Extract the data rows (excluding the header row)
            const dataRows = result.data.slice(1); // Skip the first row (header)
            setDataRows(dataRows);
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
            <tbody>
              {/* Render data rows */}
              {dataRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
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

export default CSVFileUploader;
