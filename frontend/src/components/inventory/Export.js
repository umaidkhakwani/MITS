import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ details, warehouseDetails, posDetails, return_items_data }) {
  const headers = details ? Object.keys(details[0] || {}).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  })) : [];

  const warehouse_headers = warehouseDetails ? Object.keys(warehouseDetails[0] || {}).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  })) : [];

  const pos_headers = posDetails ? Object.keys(posDetails[0] || {}).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  })) : [];

  const return_headers = return_items_data ? Object.keys(return_items_data[0] || {}).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  })) : [];

  useEffect(() => {
    console.log("details", details);
    console.log("warehouseDetails", warehouseDetails);
  }, [details, warehouseDetails]);

  return (
    <Container sx={{ margin: "20px" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "28px",
            marginTop: "20px",
          }}
        >
          Export to CSV
        </Typography>
        <Typography
          component={CSVLink}
          data={details || []}
          headers={headers}
          filename={"exported-data.csv"}
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Products Definition
        </Typography>
        <Typography
          component={CSVLink}
          data={warehouseDetails || []}
          headers={warehouse_headers}
          filename={"warehouse-data.csv"}
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Warehouse Definition
        </Typography>
        <Typography
          component={CSVLink}
          data={posDetails || []}
          headers={pos_headers}
          filename={"pos-data.csv"}
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          POS Closing
        </Typography>

        <Typography
          component={CSVLink}
          data={return_items_data || []}
          headers={return_headers}
          filename={"returned-data.csv"}
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Returned Items data
        </Typography>
      </Grid>
    </Container>
  );
}

export default ExportCSV;
