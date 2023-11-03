import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ details , warehouseDetails , posDetails}) {

  const firstObject = details[0];
  const headers = Object.keys(firstObject).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  }));

  const warehouse_firstObject = warehouseDetails[0];
  const warehouse_headers = Object.keys(warehouse_firstObject).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  }));

  const pos_firstObject = posDetails[0];
  const pos_headers = Object.keys(pos_firstObject).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  }));

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
          data={details}
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
          data={warehouseDetails}
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
          data={posDetails}
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
      </Grid>
    </Container>
  );
}

export default ExportCSV;
