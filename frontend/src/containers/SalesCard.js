import React, { useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import axios from "axios";

var API_LINK = "127.0.0.1:5000/";

const cardStyle = {
  background: "linear-gradient(45deg, #593993, #9319B5 )",
  borderRadius: "30px",
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.4)",

  minWidth: "80%",
  maxWidth: "80%",
  margin: "8px",
  display: "inline-block",
  color: "white", // Set text color to white
};

const buttonStyle = {
  backgroundColor: "white",
  color: "black", // Set button text color to black
  ":hover": {
    backgroundColor: "lightgray",
  },
};

const SalesCard = ({ sku, data }) => {
  const [responseData, setResponseData] = useState([]);

  const handleViewDetails = async () => {
    const requestData = {
      sku: sku,
      data: JSON.stringify(data),
    };

    console.log("showing request data", requestData);

    try {
      const response = await axios.post(
        API_LINK + "get_prediction",
        requestData
      );
      console.log("showing response in get_prediction", response.data);
      setResponseData(response.data);
    } catch (err) {
      console.log(err);
    }
    // Implement the functionality you want when the button is clicked.
    // For example, you can display a modal, navigate to a different page, or show additional details.
    //   alert(`View Details for SKU: ${sku}`);
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <h2>SKU</h2>
        <h3>{sku}</h3>
        <Button style={buttonStyle} onClick={handleViewDetails}>
          View Details
        </Button>
        <div>
          {Array(responseData)
            ? responseData.map((item) => (
                <div>
                  <p>max: {item.max}</p>
                  <p>min: {item.min}</p>
                </div>
              ))
            : ""}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesCard;
