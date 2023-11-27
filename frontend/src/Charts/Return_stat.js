import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";

function Return_stat(props) {
  const [inventory, setInventory] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0); // State to store the selected index
  const [displayRange, setdisplayRange] = useState("Unit");
  const [selectedInterval, setSelectedInterval] = useState("weekly");
  const [resultantYearlyArray, setResultantYearlyArray] = useState([]);

  const topProducts = props.obj1;
  //   console.log("showing obj1 ", props.obj1);

  const handleChange = (event) => {
    setInventory(event.target.value); // Update selected inventory
    console.log(event.target.value);
  };
  const handleMenuItemClick = (index) => () => {
    handle_check(index); // Call handle_check only when the MenuItem is clicked
    // call_graph()
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    call_graph(interval);
  };

  const call_graph = (interval) => {
    set_graph(interval);
  };

  const set_graph = (interval) => {
    console.log("showing topProducts", topProducts);
    if (topProducts.length === 0) {
    } else {
      // set graph data here

      const resultArray = [];
      const yearlyArray = [];

      const product = topProducts[selectedItemIndex];
      // console.log(`Product: ${product.title}`);
      // console.log(`Quantity: ${product.quantity}`);
      // console.log(`product detail: ${product}`);

      if (displayRange === "Unit") {
        //   console.log("Created At:");
        for (let j = 0; j < product.created_at.length; j++) {
          const lineItem = product.line_items[j];
          const createdAt = product.created_at[j];
          console.log(createdAt);
          console.log(
            `Title: ${lineItem.title}, Quantity: ${lineItem.quantity}`
          );

          // Check if createdAt already exists in resultArray
          const existingEntry = resultArray.find(
            (entry) => entry.x === createdAt
          );

          if (existingEntry) {
            // If it exists, add the quantity to the existing entry
            existingEntry.y += lineItem.quantity;
          } else {
            // If it doesn't exist, create a new entry
            resultArray.push({ x: createdAt, y: lineItem.quantity });
          }
        }
      } else {
        //   console.log("Created At:");
        for (let j = 0; j < product.created_at.length; j++) {
          const lineItem = product.line_items[j];
          const createdAt = product.created_at[j];
          console.log(createdAt);
          let total = (lineItem.quantity * lineItem.price).toFixed(2);
          console.log(`Title: ${lineItem.title}, Sales: ${total}`);

          // Check if createdAt already exists in resultArray
          const existingEntry = resultArray.find(
            (entry) => entry.x === createdAt
          );

          if (existingEntry) {
            // If it exists, add the total sales to the existing entry
            existingEntry.y += parseFloat(total);
          } else {
            // If it doesn't exist, create a new entry
            resultArray.push({ x: createdAt, y: parseFloat(total) });
          }
        }
      }
      // Filter data based on selected interval
      const currentDate = new Date();
      let startDate, endDate;

      switch (interval) {
        case "weekly":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 6);
          endDate = currentDate;
          setResultantYearlyArray([]);

          break;
        case "monthly":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 29);
          endDate = currentDate;
          setResultantYearlyArray([]);
          break;
        case "yearly":
          const monthlyData = {};

          resultArray.forEach((entry) => {
            const yearMonth = format(new Date(entry.x), "yyyy-MM");

            if (!monthlyData[yearMonth]) {
              monthlyData[yearMonth] = {
                x: yearMonth,
                y: 0,
              };
            }

            monthlyData[yearMonth].y += entry.y;
          });

          yearlyArray.push(...Object.values(monthlyData));
          yearlyArray.sort((a, b) => new Date(a.x) - new Date(b.x));

          // Store the yearly data in the state
          setResultantYearlyArray(yearlyArray);
          console.log("showing yearlyArray", yearlyArray);

          break;

        default:
          setResultantYearlyArray([]);
          break;
      }

      const formattedData = resultArray.map((entry) => {
        const formattedDate = format(
          new Date(entry.x),
          interval === "yearly" ? "MMM yy" : "dd MMM"
        );
        return {
          x: formattedDate,
          y: entry.y,
        };
      });

      setData(formattedData);
    }
  };

  const handle_check = (index) => {
    setSelectedItemIndex(index);
    console.log("showing index", index);
    console.log("showing topProducts", topProducts);
  };

  useEffect(() => {
    if (selectedItemIndex !== null) {
      call_graph();
    }
  }, [selectedItemIndex]);

  const [data, setData] = useState([]);

  const options = {
    series: [
      {
        name: "sales",
        data: data,
      },
    ],
    chart: {
      type: "bar",
      height: 180,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return val;
        },
      },
      group: {
        style: {
          fontSize: "10px",
          fontWeight: 700,
        },
        groups: [
          {
            title: "Dates",
            cols: data.length,
          },
        ],
      },
    },
    title: {
      text: "Return Statistics",
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  useEffect(() => {
    // Update the graph when the resultantYearlyArray changes
    if (resultantYearlyArray.length > 0) {
      const formattedData = resultantYearlyArray.map((entry) => {
        return {
          x: entry.x,
          y: entry.y,
        };
      });

      setData(formattedData);
    }
  }, [resultantYearlyArray]);

  return (
    <div id="chart">
      <div>
        <Button
          variant="outlined"
          onClick={() => handleIntervalChange("weekly")}
        >
          Weekly
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleIntervalChange("monthly")}
        >
          Monthly
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleIntervalChange("yearly")}
        >
          Yearly
        </Button>
      </div>
      <div>
        <Button variant="outlined" onClick={() => setdisplayRange("Unit")}>
          By Units
        </Button>
        <Button variant="outlined" onClick={() => setdisplayRange("Sales")}>
          By Sales
        </Button>
      </div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Products
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedItemIndex}
            onChange={handleChange}
            autoWidth
            label="Inventory"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {topProducts.map((product, index) => (
              <MenuItem
                key={index}
                value={index}
                onClick={handleMenuItemClick(index)}
              >
                {product.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <ReactApexChart
        options={options}
        series={[{ data: data }]}
        type="bar"
        height={380}
        width={900}
      />
    </div>
  );
}

export default Return_stat;
