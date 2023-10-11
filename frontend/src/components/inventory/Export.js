import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ details }) {
  const firstObject = details[0];
  const headers = Object.keys(firstObject).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    key: key,
  }));
  useEffect(() => {
    console.log("details", details);
  }, [details]);

  return (
    <Container sx={{ margin: "20px" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          component={CSVLink}
          data={details}
          headers={headers}
          filename={"exported-data.csv"}
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "28px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Export to CSV
        </Typography>
      </Grid>
    </Container>
  );
}

export default ExportCSV;
