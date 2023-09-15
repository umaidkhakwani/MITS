import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { red, green } from "@mui/material/colors";
import green_arrow from "../images/increase_arrow.png";
import red_arrow from "../images/decrease_arrow.png";

const cards = [
  {
    title: "Total Sales",
    value: 75,
    icon: "💰", // Replace with your desired icon
    stock: "746M",
  },
  {
    title: "Net Profit",
    value: 60,
    icon: "💵", // Replace with your desired icon
    stock: "100k",

  },
  {
    title: "Total Orders",
    value: 45,
    icon: "🛒", // Replace with your desired icon
    stock: "837",

  },
  {
    title: "Product Stock",
    value: 80,
    icon: "📦", // Replace with your desired icon
    stock: "8.2K",

  },
];

function Dashboard_Cards() {
  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            style={{
              height: "80px",
              width: "260px",
              margin: "0.9rem 20px",
              borderRadius: "16px",
            }}
          >
            <CardHeader
              margin="0px"
              avatar={<Avatar>{card.icon}</Avatar>}
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h7"
                      style={{ marginRight: "0.5rem", fontSize: "12px" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {card.stock}
                    </Typography>
                  </div>

                  <Typography
                    variant="h6"
                    style={{
                      color: card.value > 50 ? green[500] : red[500],
                      marginLeft: "0.5rem",
                    }}
                  >
                    {card.value}%
                    <img
                      src={card.value > 50 ? green_arrow : red_arrow}
                      alt={card.value > 50 ? "Increase" : "Decrease"}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginLeft: "0.2rem",
                      }}
                    />
                  </Typography>
                </div>
              }
            />
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <div style={{ width: "80%", marginRight: "1rem" }}>
            Add your graph component here
          </div> */}
                {/* <div>
                  <Typography
                    variant="body2"
                    style={{ color: card.value > 50 ? green[500] : red[500] }}
                  >
                    {card.value > 50 ? "Above" : "Below"} Target
                  </Typography>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard_Cards;
