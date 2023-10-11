import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  // await navigate("/dashboard");

  return <Sidebar />;
}

{
  /* <Home />
    </Box> */
}

{
  /* <Dummy /> */
}
//  </div>
export default Dashboard;
