import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import Dummy from "./dummy";

function Dashboard() {
  return (
    <div>
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Dummy />
    </Box>
     
     {/* <Dummy /> */}
    </div>
  );
}

export default Dashboard;
