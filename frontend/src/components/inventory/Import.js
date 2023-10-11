import { Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function ImportCSV() {
  //   const firstObject = details[0];
  //   const headers = Object.keys(firstObject).map((key) => ({
  //     label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
  //     key: key,
  //   }));
  //   useEffect(() => {
  //     console.log("details", details);
  //   }, [details]);

  return (
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
          Click on "Click Template" to view the template. Download this template
          in your computer and fill the details. Upload the filled template to
          import the products.
        </Typography>
      </Grid>
    </Container>
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





