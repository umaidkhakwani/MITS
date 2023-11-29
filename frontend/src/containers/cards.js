import React, { useEffect, useState } from "react";
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
import axios from "axios";
import firebase_app from "../Firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";

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
    value: 65,
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
  const [net_stat, set_net_stat] = useState(0); // State to track loading

  const user = auth.currentUser;
  var email = "";

  const handle_net_profit = async () => {
    let stats = [];
    if (user) {
      email = user.email;
      const requestData = {
        email: email,
      };

      let totalDiscount = 0;
      let totalCostPrice = 0;
      let totalRetail = 0;
      let totalExpenses = 0;

      try {
        try {
          const response_expense = await axios.post(
            API_LINK + "get_expenses_by_email",
            requestData
          );
          console.log("status in Cards", response_expense.data);
          totalExpenses = response_expense.data.reduce((result, entry) => {
            console.log("entry in Cards", entry.retail);

            return result + parseInt(entry.retail);
          }, 0);
        } catch (err) {
          console.error(err);
        }

        const response = await axios.post(API_LINK + "get_status", requestData);
        console.log("status in Cards", response.data);
        stats = response.data.reduce((result, entry) => {
          totalDiscount += parseInt(entry.totalDiscount);
          totalCostPrice += parseInt(entry.totalCostPrice);
          totalRetail += parseInt(entry.totalRetail);
          return result;
        }, {});
        console.log(
          "total in card :: ",
          totalDiscount,
          totalCostPrice,
          totalRetail,
          totalExpenses
        );
        set_net_stat(
          totalRetail - totalCostPrice - totalDiscount - totalExpenses
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    handle_net_profit();
  }, []);

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
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              background:
                card.title === "Net Profit"
                  ? net_stat > 0
                    ? "linear-gradient(45deg, #335e00,#84f105)"
                    : `linear-gradient(45deg, #b80000, #fa8687)`
                  : card.value > 50
                  ? "linear-gradient(45deg, #335e00,#84f105)"
                  : "linear-gradient(45deg, #335e00,#84f105)"
            }}
          >
            <CardHeader
              margin="0px"
              avatar={<Avatar style={{ backgroundColor: 'transparent' }}>{card.icon}</Avatar>}
              title={
                <div
                  style={{
                    color:"#c7c7c7",
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
                      {card.title === "Net Profit" ? net_stat : card.stock}
                    </Typography>
                  </div>

                  <Typography
                    variant="h6"
                    sx={{ backgroundColor: 'transparent',}}

                    // style={{
                    //   color: card.value > 50 ? green[500] : red[500],
                    //   marginLeft: "0.5rem",
                    // }}
                  >
                    {/* {card.value}% */}
                    <img
                      // src={card.value > 50 ? green_arrow : red_arrow}
                      // alt={card.value > 50 ? "Increase" : "Decrease"}
                      src={
                        card.title === "Net Profit"
                          ? net_stat > 0
                            ? green_arrow
                            : red_arrow
                          : card.value > 50
                          ? green_arrow
                          : red_arrow
                      }
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
